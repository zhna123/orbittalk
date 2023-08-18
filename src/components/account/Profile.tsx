import Icon from '@mdi/react';
import { mdiPencil } from '@mdi/js';
import { mdiCircle } from '@mdi/js';
import AVATAR_DEFAULT from '../../assets/avatar-default.png'


export function Profile() {
  return (
    <>
      <div className='flex gap-4 items-center'>
        <p className="text-2xl text-grey-800">My Profile</p>
        <div className='relative hover:cursor-pointer'>
          <Icon path={mdiPencil} size={1} className='text-grey-800 absolute top-1/4 left-1/4' />
          <Icon path={mdiCircle} size={2} className='text-red-200' />
        </div>
      </div>
      <div className='flex my-10 gap-12'>
        <div className='flex flex-col gap-6'>
          <img src={AVATAR_DEFAULT} alt="profile photo" className='h-48' />
          <button className='bg-red-500 text-red-100 p-2 rounded-md'>Upload A Photo</button>
        </div>
        <div className='text-grey-800'>
          <p className='text-lg my-6'>Unique Username</p>
          <p className='mb-4'>Screen Name</p>
          <p>Email@gmail.com</p>
        </div>
      </div>
     
    </>
  )
}