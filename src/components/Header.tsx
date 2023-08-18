import LOGO from '../assets/logo.png'
import Icon from '@mdi/react';
import { mdiBellOutline } from '@mdi/js';
import { mdiCircleMedium } from '@mdi/js';
import AVATAR_DEFAULT from '../assets/avatar-default.png'
import ONLINE_CIRCLE from '../assets/online-circle.png'
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../App';


const showAccount = () => {
  return (
    <div className='flex items-center gap-4'>
      <div className='relative'>
        <Icon path={mdiBellOutline}
          title="Notification Bell"
          size='30px'
          className='text-grey-500'
        />
        <Icon path={mdiCircleMedium} size={1} className='text-red-500 absolute -top-1 -right-1' />
      </div>
      <Link to='account'>
        <div className='relative'>
          <img src={ AVATAR_DEFAULT } alt="default avatar" className='h-12' />
          <img src={ ONLINE_CIRCLE } alt="online circle" className='h-12 absolute top-0 left-0' />
        </div>
      </Link>
    </div>
  )
}

export function Header() {

  const { signIn } = useContext(AppContext)

  return (
    <header className="h-24 flex justify-between items-start">
      <img src={ LOGO } alt="logo" className='h-12' />
      { signIn && showAccount() }
    </header>
  )
}