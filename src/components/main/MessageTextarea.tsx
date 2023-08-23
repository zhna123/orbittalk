import { useForm, SubmitHandler } from "react-hook-form"
import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import { ConvState, Message } from "../../types";
import { SERVER_URL } from "../../util/constant";




type Inputs = {
  content: string,
}

interface Props {
  convState: ConvState,
  handleAddNewMessage: (new_msg: Message) => void
}

export const MessageTextarea = ({convState, handleAddNewMessage}: Props) => {

  const {
    register,
    reset,
    watch,
    handleSubmit,
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: {
      content: ''
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const updated = {...data, date_time: new Date()}
    try {
      const res = await fetch(`${SERVER_URL}/conversations/${convState.convId}/messages`, {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(updated),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (res.status === 201) {
        const result = await res.json()
        console.log(result.msg)
        handleAddNewMessage(result.data)
        reset()
      } else {
        console.log("failed sending messages")
      }
    } catch (e) {
      console.log("error happened when sending messages:" + e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='gap-1 sm:gap-2 flex'>
      <textarea id="content" rows={1}
        {...register("content")}
        className='grow rounded-md border-grey-300 resize-none focus:ring-0 focus:border-grey-600 focus:shadow-inner' />
      
      { watch("content").trim() === '' ?  
        <button className='rounded-md border-none bg-grey-400 text-grey-100 text-sm p-1 sm:text-lg' disabled>
          <Icon path={mdiSend} className='h-4 sm:h-6' />
        </button> :
        <button className='rounded-md border-none bg-red-500 text-red-100 text-sm p-1 sm:text-lg focus:ring-0 active:bg-red-600'>
          <Icon path={mdiSend} className='h-4 sm:h-6' />
        </button>
      }
    </form>
  )
}