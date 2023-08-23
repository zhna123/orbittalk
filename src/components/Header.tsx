import LOGO from '../assets/logo.png'
import Icon from '@mdi/react';
import { mdiBellOutline } from '@mdi/js';
import { mdiCircleMedium } from '@mdi/js';
import AVATAR_DEFAULT from '../assets/avatar-default.png'
import ONLINE_CIRCLE from '../assets/online-circle.png'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../App';
import { User } from '../types';
import { getAvatarDataUri } from '../util/image';


const showAccount = (user: User | null) => {
  return (
    <div className='flex items-center gap-2 sm:gap-4'>
      <div className='relative'>
        <Icon path={mdiBellOutline}
          title="Notification Bell"
          className='text-grey-500 w-[20px] sm:w-[25px]'
        />
        <Icon path={mdiCircleMedium} size={1} className='text-red-500 absolute -top-2 -right-2' />
      </div>
      <Link to='account' className='shrink-0'>
        <div className='relative'>
          {
            user && user.avatar ?
              <img src={ getAvatarDataUri(user.avatar) } alt="user avatar" className='h-6 w-6 rounded-full sm:h-10 sm:w-10 object-cover' />
              :
              <img src={ AVATAR_DEFAULT } alt="default avatar" className='h-6 rounded-full sm:h-10 object-cover' />
          }
          <img src={ ONLINE_CIRCLE } alt="online circle" className='h-6 w-6 rounded-full sm:h-10 sm:w-10 absolute top-0 left-0' />
        </div>
      </Link>
    </div>
  )
}

export function Header() {

  const { signIn, user } = useContext(AppContext)
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  }

  return (
    <header className="h-10 sm:h-16 flex justify-between items-start">
      <img src={ LOGO } alt="logo" className='h-6 sm:h-10 cursor-pointer' onClick={ goHome }/>
      { signIn && showAccount(user) }
    </header>
  )
}