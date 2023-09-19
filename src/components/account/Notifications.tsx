import AVATAR_DEFAULT from '../../assets/avatar-default.png'

export function Notifications() {
  return (
    <>
      <h1 className="text-grey-800 text-lg sm:text-xl mb-6 sm:mb-10 font-semibold">Notifications</h1>
      <ul>
        <li className='flex gap-2 sm:gap-4 text-sm sm:text-lg'>
          <img src={ AVATAR_DEFAULT } alt="avatar" className='h-6 sm:h-8' />
          <div>
            <p className='text-grey-800 text-xs sm:text-sm'><span className='italic'>April</span> wants to add you as a friend.</p>
            <p className='text-grey-500 mb-1 sm:mb-2 text-xs sm:text-sm'>5 mins ago</p>
            <button className='bg-red-500 sm:px-3 px-2 sm:py-1 mr-4 rounded-md text-red-100 text-[10px] sm:text-xs'>Accept</button>
            <button className='outline outline-grey-600 px-2 sm:px-3 sm:py-1 rounded-md text-grey-700 text-[10px] sm:text-xs'>Ignore</button>
          </div>
        </li>
        <div className='h-0.5 bg-red-200 my-2 sm:my-4'></div>
      </ul>
    </>
  )
}