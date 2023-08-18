import AVATAR_DEFAULT from '../../assets/avatar-default.png'

export function Notifications() {
  return (
    <>
      <p className="text-grey-800 text-2xl mb-10">Notifications</p>
      <ul>
        <li className='flex gap-4'>
          <img src={ AVATAR_DEFAULT } alt="avatar" className='h-10' />
          <div>
            <p className='text-grey-800'><span className='font-medium'>April</span> wants to add you as a friend.</p>
            <p className='text-grey-500 mb-4'>5 mins ago</p>
            <button className='bg-red-500 px-3 py-1 mr-4 rounded-md text-red-100'>Accept</button>
            <button className='outline outline-grey-600 px-3 py-1 rounded-md text-grey-700'>Ignore</button>
          </div>
        </li>
        <div className='h-0.5 bg-red-200 my-6'></div>
      </ul>
    </>
  )
}