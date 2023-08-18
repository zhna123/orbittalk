import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import { mdiPlus } from '@mdi/js';
import { mdiCircle } from '@mdi/js';
import AVATAR_DEFAULT from '../../assets/avatar-default.png'


export function Friends() {
  return (
    <>
      <div className='flex gap-4 items-center mb-10'>
        <p className='text-2xl text-grey-800'>My Friends</p>
        <div className='relative hover:cursor-pointer'>
          <Icon path={mdiPlus} size={1} className='text-grey-800 absolute top-1/4 left-1/4' />
          <Icon path={mdiCircle} size={2} className='text-red-200' />
        </div>
      </div>
      <ul className='max-w-md flex flex-col gap-2'>
        <li className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <img src={ AVATAR_DEFAULT } alt="avatar" className='h-10' />
            <span className='text-grey-800'>Janurary</span>
          </div>
          <div className='relative hover:cursor-pointer'>
            <Icon path={mdiTrashCan} size={1} className='text-grey-800 absolute top-1/4 left-1/4' />
            <Icon path={mdiCircle} size={2} className='text-red-200' />
          </div>
        </li>
        <div className='h-0.5 bg-red-200'></div>
        <li className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <img src={ AVATAR_DEFAULT } alt="avatar" className='h-10' />
            <span className='text-grey-800'>Feburary</span>
          </div>
          <div className='relative hover:cursor-pointer'>
            <Icon path={mdiTrashCan} size={1} className='text-grey-800 absolute top-1/4 left-1/4' />
            <Icon path={mdiCircle} size={2} className='text-red-200' />
          </div>
        </li>
        <div className='h-0.5 bg-red-200'></div>
        <li className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <img src={ AVATAR_DEFAULT } alt="avatar" className='h-10' />
            <span className='text-grey-800'>March</span>
          </div>
          <div className='relative hover:cursor-pointer'>
            <Icon path={mdiTrashCan} size={1} className='text-grey-800 absolute top-1/4 left-1/4' />
            <Icon path={mdiCircle} size={2} className='text-red-200' />
          </div>
        </li>
        <div className='h-0.5 bg-red-200'></div>
      </ul>
    </>
  )
}