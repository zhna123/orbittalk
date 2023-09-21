import { useContext, useEffect, useState } from 'react';
import { NewChatModule } from './NewChatModule';
import { AppContext } from '../../App';
import { ConvState, Conversation, ConversationType, Message, User } from '../../types';
import { ConversationListItem } from './ConversationListItem';
import { WelcomePanel } from './WelcomePanel';
import { MessagePanel } from './MessagePanel';
import { Buffer } from 'buffer';
import { SERVER_URL } from '../../util/constant';


export default function ChatBoard() {

  const { user } = useContext(AppContext)

  const [openNewChat, setOpenNewChat] = useState<boolean>(false)

  const [chatActive, setChatActive] = useState<boolean>(false)
  // current selected conversation states
  const [convState, setConvState] = useState<ConvState>({
    friendName: '',
    isOnline: false, 
    friendAvatar: undefined,
    messages: [],
    convId: '',
  })
  // selected conversation from left panel
  const [selected, setSelected] = useState<string>('')
  // all conversations retrieved for authenticated user
  const [conversations, setConversations] = useState<(Conversation | null) []>([])
  
  useEffect(() => {
    const retrieveConversations = async () => {
      const res = await fetch(`${SERVER_URL}/conversations`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (res.status === 200) {
        
        const convs: ConversationType[] = await res.json();
        // get usernames from userids in each conversation
        const conversationPromises: Promise<Conversation | null>[] = convs.map(async conv => {

          const allIds = conv.userids;
          // only display friend's name
          // This check is needed because user id might not be retrieved yet.
          // when the id value change, useeffect will be triggered again to get friend info
          if (user) {
            const friendUserId = allIds.find(id => id !== user._id);
            const res = await fetch(`${SERVER_URL}/users/${friendUserId}`, {
              method: "GET",
              mode: "cors",
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              }
            })
            if (res.status === 200) {
              const friend: User = await res.json()
              // check if the conversation has unread messages
              const messages = conv.messages;
              const hasUnreadMessages = messages.some(m => m.is_read === false && m.sender !== user._id)
              return {
                friend_id: friend._id,
                friend_name: friend.screen_name,
                is_online: friend.is_online,
                friend_avatar: friend.avatar,
                is_read: hasUnreadMessages ? false : true,
                conversation: conv
              }
            } else {
              console.log(`Failed to retrieve friend data for user ID: ${friendUserId}`);
              return null
            }
          } else {
            console.log('still retrieving user..');
            return null;
          }
        })
        
        const conversationData = await Promise.all(conversationPromises)
        const filteredData = conversationData.filter(data => data !== null);    
        setConversations(filteredData)
        
      } else {
        console.log("failed retrieving conversations.")
      }
    }
    retrieveConversations()
    
  }, [user])

  const handleAddNewMessage = (new_msg: Message) => {
    const msgs = convState.messages;
    setConvState({ ...convState, messages:[...msgs, new_msg]})
  }

  const chatPanel = () => {
    if (chatActive) {
      return <MessagePanel convState={ convState } handleAddNewMessage={handleAddNewMessage} />
    }
    return <WelcomePanel />
  }

  const showConversation = (friendName: string, isOnline: boolean, friendAvatar: Buffer, conversation: ConversationType) => {
    setChatActive(true)
    setConvState({
      friendName: friendName,
      isOnline: isOnline,
      friendAvatar: friendAvatar,
      messages: conversation.messages,
      convId: conversation._id,
    })
    setSelected(friendName)
  }

  const openNewChatModule = (open: boolean) => {
    setOpenNewChat(open)
  }

  const handleStartChat = async (friend: User) => {
    const conv = conversations.find(con => con!.friend_id === friend._id)
    if (conv) {
      showConversation(conv.friend_name, conv.is_online, conv.friend_avatar, conv.conversation)
      setOpenNewChat(false)
      return
    }
    const data = {
      userids: [friend._id, user!._id],
      messages: []
    }
    const res = await fetch(`${SERVER_URL}/conversations`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (res.status === 201) {
      const result = await res.json()
      console.log(result.msg)
      const newConv: Conversation = {
        friend_id: friend._id,
        friend_name: friend.screen_name,
        is_online: friend.is_online,
        friend_avatar: friend.avatar,
        is_read: true,
        conversation: result.data
      }
      setConversations([...conversations, newConv])
      showConversation(newConv.friend_name, newConv.is_online, newConv.friend_avatar, newConv.conversation)
      openNewChatModule(false)
    } else {
      console.log(`creating conversation with friend ${friend._id} failed`)
    }
  }

  // need to set a max-h for the left panel and allow it to scroll when overflow
  // right panel always stays within viewport
  return (
    <>
    <div className="flex gap-2 sm:gap-8 grow text-xs sm:text-lg">
      <div className="grow-0 shrink-0 basis-24 sm:basis-60 bg-grey-100 rounded-md sm:max-h-[calc(100vh_-_170px)] sm:overflow-auto">
        <div className='px-2 py-4 sm:px-4 sm:py-6'>
          <button className="form-input text-xs sm:text-sm bg-red-500 active:bg-red-600 text-red-100 border-none rounded-md block mx-auto w-full" 
          onClick={ () => openNewChatModule(true) }>New Chat</button>
        </div>
        <p className='text-xs sm:text-sm text-grey-500 px-2 sm:px-4 pb-2 sm:pb-4'>All conversations</p>
        {
          conversations.length === 0 ? <p className='text-xs sm:text-sm text-grey-800 px-2 sm:px-4'>No conversation yet.</p> :
            conversations.map( conv => <ConversationListItem
              key={conv?.conversation._id} 
              friendName={conv!.friend_name} 
              isOnline={conv!.is_online} 
              friendAvatar={conv!.friend_avatar}
              isRead={conv!.is_read} 
              conversation={conv!.conversation}
              showConversation={showConversation}
              selected={selected} />
            )
        }
      </div>
      <div className="flex flex-col gap-4 grow">
        {chatPanel()}
      </div>
    </div>
    { openNewChat && <NewChatModule openNewChatModule={openNewChatModule} handleStartChat={handleStartChat} /> }
    <hr className='h-0.5 text-grey-200 my-6 w-full mx-auto' />
    <footer className='text-grey-500 text-sm mt-auto'>
      &copy;2023 zhna123. All rights reserved.
    </footer>
    </>
  )
}