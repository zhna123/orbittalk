import { useState } from "react"
import { ConversationType } from "../../types"
import AVATAR_DEFAULT from '../../assets/avatar-default.png'
import ONLINE_CIRCLE from '../../assets/online-circle.png'
import Icon from '@mdi/react';
import { mdiCircle } from '@mdi/js';
import { getAvatarDataUri } from "../../util/image";
import { Buffer } from 'buffer';
import { SERVER_URL } from "../../util/constant";




interface Props {
  friendName: string, 
  isOnline: boolean, 
  friendAvatar: Buffer,
  isRead: boolean, 
  conversation: ConversationType,
  showConversation: (friendName: string, isOnline: boolean, friendAvatar: Buffer, conversation: ConversationType) => void,
  selected: string
}

export const ConversationListItem = ({friendName, isOnline, friendAvatar, isRead, conversation, showConversation, selected}: Props) => {

  const [isConvRead, setIsConvRead] = useState<boolean>(isRead)

  const handleClick = () => {
    if (!isConvRead) {
      // mark messages in this conversation as read
      const updateReadStatus = async () => {
        const res = await fetch(`${SERVER_URL}/conversations/messages`, {
          method: "PUT",
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(conversation),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        if (res.status === 200) {
          console.log("update message status succeed.")
        } else {
          console.log("failed update message status.")
        }
      }
      updateReadStatus()
    }
    setIsConvRead(true)
    showConversation(friendName, isOnline, friendAvatar, conversation)
  }

  return (
    <div
      className={`flex gap-2 sm:gap-4 items-center text-grey-800 hover:bg-grey-200 ${selected === friendName ? 'bg-grey-300 hover:bg-grey-300' : ''} 
        cursor-pointer px-2 py-1 sm:px-4 sm:py-2`}
      onClick={ handleClick }>

      <div className='relative grow-0 shrink-0'>
        {
          friendAvatar ?
            <img src={ getAvatarDataUri(friendAvatar) } alt="default avatar" className='h-5 w-5 sm:h-8 sm:w-8 rounded-full object-cover' />
            :
            <img src={ AVATAR_DEFAULT } alt="default avatar" className='h-5 w-5 sm:h-8 sm:w-8 rounded-full object-cover' />
        }
        { isOnline ? <img src={ ONLINE_CIRCLE } alt="online circle" className='h-5 w-5 sm:h-8 sm:w-8 rounded-full absolute top-0 left-0' /> : ''}
      </div>
      <div className="text-xs sm:text-sm">{ friendName }</div>
      <div className='relative ml-auto'>
        { !isConvRead ? <Icon path={mdiCircle} size={.5} className='text-red-500' /> : '' }
      </div>
    </div>
  )
}