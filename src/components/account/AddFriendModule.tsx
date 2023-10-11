import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useContext, useEffect, useRef, useState } from "react";
import { User } from "../../types";
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { useFriendList } from "../../hooks/useFriendList";
import { AppContext } from "../../App";
import { SERVER_URL } from "../../util/constant";
import { findUserByName } from "../../api/user";


export type Inputs = {
  username: string
}

interface Props {
  openModule: (b:boolean) => void
  handleAddFriend: (friend: User) => void
}

interface ErrorDivProps {
  name: keyof Inputs;
}

export function AddFriendModule({ openModule, handleAddFriend }: Props) {

  const { user } = useContext(AppContext)

  const [friendFound, setFriendFound] = useState<User>()
  const [notFound, setNotFound] = useState<boolean>(false)

  const moduleRef = useRef<HTMLDivElement>(null)

  const { friendList } = useFriendList()

  useEffect(() => {
    const moduleElement = moduleRef.current;
    const handleClickOutside = (e: MouseEvent) => {
      if (moduleElement && !moduleElement.contains(e.target as Node)) {
        openModule(false);
      }
    }
    if (moduleElement) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [])

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: {
      username: '',
    }
  })

  const ErrorDiv = ({name}: ErrorDivProps) => {
    return (
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p role="alert" className="text-red-600 text-sm font-medium">{message}</p>}
      />
    )
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    setFriendFound(undefined)
    setNotFound(false)
    const resultUser = await findUserByName(data)
    if (resultUser) {
      setFriendFound(resultUser)
    } else {
      setNotFound(true)
    }
    reset()
  }
  
  return (
    <div className="bg-grey-100 bg-opacity-60 fixed h-full w-full top-0 left-0 flex justify-center items-center">
      <div ref={moduleRef} className="p-4 bg-white border-none rounded-md shadow-lg max-w-xs w-full min-h-min">
        <p className="pb-2 text-grey-700 text-sm">Enter username to find a friend</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mb-2">
          <input type="text" id="username" aria-label="username"
            aria-invalid={errors.username ? "true" : "false"}
            {...register("username", {
              required: "This is required"
            })}
            className={`form-input w-full rounded-md border-grey-300 ${errors.username ? 'focus:ring-0 focus:border-red-500'
            :'focus:ring-0 focus:border-grey-600 focus:shadow-inner' }`} />
          
          <button type="submit" 
            className="form-input text-red-100 bg-red-500 border-none rounded-md focus:ring-0 active:bg-red-600">Find</button>
        </form>
        <ErrorDiv name="username" />
        {
          friendFound ? 
          <div className="py-2 pl-2 mt-4 rounded-md text-grey-800 hover:bg-grey-200 relative">
            {friendFound.screen_name}
            { !friendList.find(f => f!._id === friendFound._id) && user!._id !== friendFound._id 
              && <button aria-label="add" onClick={() => handleAddFriend(friendFound)}>
                  <Icon path={mdiPlus} size={1} className='text-red-500 absolute top-1/4 right-2 cursor-pointer' />
                </button>
            }
          </div>
          :
          (
            notFound ? <div className="text-grey-800 py-2 pl-2">No user found.</div> : ''
          )
        }
      </div>
    </div>
  )
}