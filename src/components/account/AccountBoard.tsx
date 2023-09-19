import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiAccountDetails } from '@mdi/js';
import { mdiSecurity } from '@mdi/js';
import { mdiAccountGroupOutline } from '@mdi/js';
import { mdiBellOutline } from '@mdi/js';
import { mdiLogout } from '@mdi/js';
import { AppContext } from "../../App";


export function AccountBoard() {

  const { handleSignOut } = useContext(AppContext)

  const [selected, setSelected] = useState<string>('')

  return (
    <>
    <div className="flex grow">
      <div className="bg-red-500 rounded-l-md basis-20 sm:basis-52 shrink-0 grow-0">
        <p className="text-grey-100 text-sm sm:text-base p-2 sm:p-4 font-semibold">Account</p>
        <ul role="tablist" aria-label='account-settings-list' className="text-grey-100 text-xs sm:text-sm">
          <Link to=''>
            <li onClick={() => setSelected('profile')}
              role="tab" 
              aria-label="profile"
              aria-selected={selected === 'profile' ? 'true' : 'false'}
              tabIndex={selected === 'profile' ? 0 : -1}
              className={`hover:bg-red-300 hover:bg-opacity-50 flex gap-4 items-center p-2 sm:p-4 ${selected === 'profile' ? 'bg-red-400 bg-opacity-50 hover:bg-red-400 font-medium sm:font-semibold': ''}`}>
              <Icon path={mdiAccountDetails} size={1} className="hidden sm:block" />
              <span>My Profile</span>
            </li>
          </Link>
          <Link to='security'>
            <li onClick={() => setSelected('security')}
              role="tab" 
              aria-label="security"
              aria-selected={selected === 'security' ? 'true' : 'false'}
              tabIndex={selected === 'security' ? 0 : -1}
              className={`hover:bg-red-300 hover:bg-opacity-50 flex gap-4 items-center p-2 sm:p-4 ${selected === 'security' ? 'bg-red-400 bg-opacity-50 hover:bg-red-400 font-medium sm:font-semibold': ''}`}>
              <Icon path={mdiSecurity} size={1} className="hidden sm:block"/>
              <span>Security</span>
            </li>
          </Link>
          <Link to='friends'>
            <li onClick={() => setSelected('friends')}
              role="tab" 
              aria-label="friends"
              aria-selected={selected === 'friends' ? 'true' : 'false'}
              tabIndex={selected === 'friends' ? 0 : -1}
              className={`hover:bg-red-300 hover:bg-opacity-50 flex gap-4 items-center p-2 sm:p-4 ${selected === 'friends' ? 'bg-red-400 bg-opacity-50 hover:bg-red-400 font-medium sm:font-semibold': ''}`}>
              <Icon path={mdiAccountGroupOutline} size={1} className="hidden sm:block"/>
              <span>Friends</span>
            </li>
          </Link>
          <Link to='notifications'>
            <li onClick={() => setSelected('notifications')}
              role="tab" 
              aria-label="notifications"
              aria-selected={selected === 'notifications' ? 'true' : 'false'}
              tabIndex={selected === 'notifications' ? 0 : -1}
              className={`hover:bg-red-300 hover:bg-opacity-50 flex gap-4 items-center p-2 sm:p-4 ${selected === 'notifications' ? 'bg-red-400 bg-opacity-50 hover:bg-red-400 ffont-medium sm:ont-semibold': ''}`}>
              <Icon path={mdiBellOutline} size={1} className="hidden sm:block"/>
              <span>Notifications</span>
            </li>
          </Link>
        </ul>
        <div className="h-0.5 bg-red-300 w-4/5 mx-auto mt-8"></div>
        <div className="flex gap-4 items-center p-2 mt-2 sm:p-4 text-grey-100 cursor-pointer">
          <Icon path={mdiLogout} size={1} className="hidden sm:block"/>
          <p className="text-xs sm:text-sm" onClick={handleSignOut}>Sign Out</p>
        </div>
      </div>
      <div className="bg-grey-100 rounded-r-md p-4 grow sm:py-12 sm:px-20">
        <Outlet />
      </div>
    </div>
    <hr className='h-0.5 text-grey-200 my-6 w-full mx-auto' />
    <footer className='text-grey-500 text-sm mt-auto'>
      &copy;2023 zhna123. All rights reserved.
    </footer>
    </>
  )
}