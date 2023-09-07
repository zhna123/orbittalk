import FormatDate from '../../util/date';
import AVATAR_DEFAULT from '../../assets/avatar-default.png'
import ONLINE_CIRCLE from '../../assets/online-circle.png'
import { ConvState, Message } from '../../types';
import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../App';
import { Buffer } from 'buffer'
import { getAvatarDataUri } from '../../util/image';
import { MessageTextarea } from './MessageTextarea';


interface Props {
  convState: ConvState,
  handleAddNewMessage: (new_msg: Message) => void
}

export const MessagePanel = ({convState, handleAddNewMessage}: Props) => {

  const messages = convState.messages;
  const friendName = convState.friendName;
  const isOnline = convState.isOnline;
  const friendAvatar = convState.friendAvatar;

  const { user } = useContext(AppContext)

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [convState]);

  return (
    <>
    <div className='bg-grey-100 rounded-md flex flex-col gap-4 sm:gap-8 items-center pt-28 grow max-h-[calc(100vh_-_200px)] sm:max-h-[calc(100vh_-_230px)] overflow-auto'>
      <p className="text-sm sm:text-base font-medium text-grey-800">Start Chat With { friendName }!</p>
      {
        messages.map( m => { 
          return (
            <div key={m._id} className='self-start px-2 sm:px-6 flex gap-2 sm:gap-4'>
              { 
                (m.sender === user!._id) ? <OnlineProfile avatar={user!.avatar} /> : 
                ( isOnline ? <OnlineProfile avatar={friendAvatar} /> : <OfflineProfile avatar={friendAvatar} />)
              
              }
              
              <div>
                <p className='text-sm font-medium text-grey-800'>{ (m.sender === user!._id) ? user!.screen_name : friendName} &nbsp; 
                  <span className='text-grey-500'>
                    <FormatDate dateString={m.date_time} />
                  </span>
                </p>
                <p className='text-sm text-grey-800 font-light'>{m.content}</p>
              </div>
            </div>)
        } )
      }
      <div ref={messagesEndRef} />
    </div>
    <MessageTextarea convState={convState} handleAddNewMessage={handleAddNewMessage} />
    </>
  )
}

interface AvatarProps {
  avatar: Buffer | undefined
}

const OnlineProfile = ({avatar}: AvatarProps) => {
  return (
    <div className='relative grow-0 shrink-0'>
      {
        avatar ?
          <img src={ getAvatarDataUri(avatar) } alt="avatar" className='h-5 w-5 sm:h-10 sm:w-10 rounded-full object-cover' />
          :
          <img src={ AVATAR_DEFAULT } alt="default avatar" className='h-5 w-5 sm:h-10 sm:w-10 rounded-full object-cover' />
      }
      <img src={ ONLINE_CIRCLE } alt="online circle" className='h-5 w-5 sm:h-10 sm:w-10 absolute top-0 left-0 rounded-full' />
    </div>
  )
}

const OfflineProfile = ({avatar}: AvatarProps) => {
  return (
    <div className='relative grow-0 shrink-0'>
      {
        avatar ?
          <img src={ getAvatarDataUri(avatar) } alt="avatar" className='h-5 w-5 sm:h-10 sm:w-10 rounded-full object-cover' />
          :
          <img src={ AVATAR_DEFAULT } alt="default avatar" className='h-5 w-5 sm:h-10 sm:w-10 rounded-full object-cover' />
      }
    </div>
  )
}
