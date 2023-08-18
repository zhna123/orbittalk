import AVATAR_DEFAULT from '../assets/avatar-default.png'
import ONLINE_CIRCLE from '../assets/online-circle.png'
import Icon from '@mdi/react';
import { mdiCircle } from '@mdi/js';
import { useState } from 'react';
import { NewChatModule } from './NewChatModule';

export function ChatBoard() {

  const [chatActive, setChatActive] = useState<boolean>(false)
  const [newChat, setNewChat] = useState<boolean>(false)

  const [name, setName] = useState<string>('');

  const openNewchat = () => {
    setNewChat(true)
  }

  const chatWelcomePanel = () => {
    return (
      <div className='bg-grey-100 rounded-md flex flex-col gap-8 items-center pt-28 grow'>
        <p className="text-2xl font-semibold text-grey-800">Welcome to Orbit Talk</p>
        <p className="text-grey-500">Select conversation from left to continue, or start a new chat!</p>
      </div>
    )
  }

  const withChatBox = (name: string) => {
    return (
      <>
      <div className='bg-grey-100 rounded-md flex flex-col gap-8 items-center pt-28 grow'>
        <p className="text-lg font-medium text-grey-800">Start Chat With { name }!</p>
        {/* <p className="text-grey-500">Select conversation from left to continue, or start a new chat!</p> */}
      </div>
      <div className='flex gap-4'>
        <input type="text" name="message" id="message" className='form-input grow rounded-md border-grey-300' />
        <button className='form-input rounded-md border-none bg-red-500 text-red-100'>Send</button>
      </div>
      </>
    )
  }

  const chatPanel = () => {
    if (chatActive) {
      return withChatBox(name)
    }
    return chatWelcomePanel()
  }

  const selectChat = (name: string) => {
    setName(name)
    setChatActive(true)
  }

  // need to set a max-h for the left panel and allow it to scroll when overflow
  // right panel always stays within viewport
  return (
    <>
    <div className="grid gap-4 grid-cols-4 grow">
      <div className="bg-grey-100 rounded-md max-h-[calc(100vh_-_170px)] overflow-auto">
        <div className='px-4 py-6'>
          <button className="form-input bg-red-500 text-red-100 border-none rounded-md block mx-auto w-full" onClick={ openNewchat }>New Chat</button>
        </div>
        <div className='flex flex-wrap gap-4 items-center text-grey-800 hover:bg-grey-200 cursor-pointer px-4 py-2' onClick={ () => selectChat('January') }>
          <div className='relative'>
            <img src={ AVATAR_DEFAULT } alt="default avatar" className='h-10' />
            <img src={ ONLINE_CIRCLE } alt="online circle" className='h-10 absolute top-0 left-0' />
          </div>
          <div>January</div>
          <div className='relative ml-auto'>
            <Icon path={mdiCircle} size={1} className='text-red-500' />
            <span className='absolute text-red-100 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>1</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-4 items-center text-grey-800 hover:bg-grey-200 cursor-pointer px-4 py-2' onClick={ () => selectChat('Feburary') }>
          <img src={ AVATAR_DEFAULT } alt="default avatar" className='h-10' />
          <div>February</div>
          <div className='relative ml-auto'>
            <Icon path={mdiCircle} size={1} className='text-red-500' />
            <span className='absolute text-red-100 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>1</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-4 items-center text-grey-800 hover:bg-grey-200 cursor-pointer px-4 py-2' onClick={ () => selectChat('March') }>
          <img src={ AVATAR_DEFAULT } alt="default avatar" className='h-10' />
          <div>March</div>
          <div className='relative ml-auto'>
            <Icon path={mdiCircle} size={1} className='text-red-500' />
            <span className='absolute text-red-100 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>1</span>
          </div>
        </div>
      </div>
      <div className="col-span-3 flex flex-col gap-8">
        {chatPanel()}
      </div>
    </div>
    { newChat && <NewChatModule /> }
    <hr className='h-0.5 text-grey-200 my-6 w-full mx-auto' />
    <footer className='text-grey-500 text-sm mt-auto'>
      &copy;2023 zhna123. All rights reserved.
    </footer>
    </>
  )
}