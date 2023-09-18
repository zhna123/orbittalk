import Icon from '@mdi/react';
import { mdiBellOutline } from '@mdi/js';
import { mdiCircleMedium } from '@mdi/js';
import AVATAR_DEFAULT from '../assets/avatar-default.png'
import ONLINE_CIRCLE from '../assets/online-circle.png'
import { Link } from "react-router-dom";
import { User } from '../types';
import { getAvatarDataUri } from '../util/image';

interface Props {
  user: User |  null
}

export default function AccountHeader({user}: Props) {
  return (
    <div data-testid="account" className='flex items-center gap-2 sm:gap-4'>
      <div className='relative'>
        <Icon path={mdiBellOutline}
          title="Notification Bell"
          className='text-grey-500 w-[20px] sm:w-[25px]'
        />
        <Icon path={mdiCircleMedium} size={1} className='text-red-500 absolute -top-2 -right-2' />
      </div>
      <Link to='account' className='shrink-0'>
        <div className='relative' role='img' aria-label='user avatar'>
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

