import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export function AccountBoard() {
  return (
    <>
    <div className="grid grid-cols-4 grow">
      <div className="bg-red-200 rounded-l-md">
        <ul className="text-xl text-grey-800">
          <Link to=''>
            <li className="hover:bg-red-300 rounded-tl-md p-6 text-red-800">
              <span>My Profile</span>
            </li>
          </Link>
          <Link to='security'>
            <li className="hover:bg-red-300 rounded-tl-md p-6 text-red-800">
              <span>Security</span>
            </li>
          </Link>
          <Link to='friends'>
            <li className="hover:bg-red-300 rounded-tl-md p-6 text-red-800">
              <span>Friends</span>
            </li>
          </Link>
          <Link to='notifications'>
            <li className="hover:bg-red-300 rounded-tl-md p-6 text-red-800">
              <span>Notifications</span>
            </li>
          </Link>
        </ul>
        <div className="h-0.5 bg-red-300 w-4/5 mx-auto mt-10"></div>
        <p className="p-6 text-red-600 font-medium text-lg">Sign Out</p>
      </div>
      <div className="col-span-3 bg-grey-100 rounded-r-md py-12 px-20">
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