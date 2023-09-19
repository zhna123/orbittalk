import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import { mdiPlus } from '@mdi/js';
import { mdiCircle } from '@mdi/js';
import AVATAR_DEFAULT from '../../assets/avatar-default.png'
import { useFriendList } from '../../hooks/useFriendList';
import { useState } from 'react';
import { AddFriendModule } from './AddFriendModule';
import { User } from '../../types';
import { SERVER_URL } from '../../util/constant';




export function Friends() {

  const { isLoading, friendList, addFriend } = useFriendList()

  const [openModule, setOpenModule] = useState<boolean>(false)

  const handleAddFriend = async (friend: User) => {
    const res = await fetch(`${SERVER_URL}/users/friend`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({"friendId": friend._id}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (res.status === 200) {
      console.log("friend added")
      const result = await res.json()
      addFriend(result.data)
      setOpenModule(false)
    } else {
      console.log("failed to add friend")
    }
  }

  return (
    <>
      <div className='flex gap-4 items-center mb-6 sm:mb-10'>
        <h1 className='text-lg sm:text-xl text-grey-800 font-semibold'>My Friends</h1>
        <div className='relative hover:cursor-pointer' onClick={() => setOpenModule(true) }>
          <Icon path={mdiPlus} className='text-grey-800 absolute top-1/4 left-1/4 h-5 sm:h-6' />
          <Icon path={mdiCircle} className='text-red-200 h-10 sm:h-12' />
        </div>
      </div>
      <ul className='max-w-md flex flex-col gap-2 text-xs sm:text-sm max-h-full overflow-auto'>
          {
            isLoading ? <li className='text-grey-800'>Loading friends...</li> :
            (
              friendList.length === 0 ? <li>No friend added yet.</li> :
              <>
              { friendList.map(f => (
                  <div key={f!._id}>
                    <li className='flex justify-between items-center'>
                      <div className='flex items-center gap-2 sm:gap-4'>
                        <img src={ AVATAR_DEFAULT } alt="avatar" className='h-6 sm:h-10' />
                        <span className='text-grey-800'>{f!.screen_name}</span>
                      </div>
                      <div className='relative hover:cursor-pointer'>
                        <Icon path={mdiTrashCan} className='text-grey-800 absolute top-1/4 left-1/4 h-4 sm:h-5' />
                        <Icon path={mdiCircle} className='text-red-200 h-8 sm:h-10' />
                      </div>
                    </li>
                    <div className='h-0.5 bg-red-200 mt-1 sm:mt-2'></div>
                  </div>
                )) 
              }
              </>
            )
          }
      </ul>
      {
        openModule && <AddFriendModule openModule={(b: boolean) => setOpenModule(b)} handleAddFriend={handleAddFriend} />
      }
    </>
  )
}