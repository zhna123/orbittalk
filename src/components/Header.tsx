import LOGO from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../App';
import AccountHeader from './AccountHeader';


export function Header() {

  const { signIn, user } = useContext(AppContext)
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  }

  return (
    <header className="h-10 sm:h-16 flex justify-between items-start">
      <img src={ LOGO } alt="logo" className='h-6 sm:h-10 cursor-pointer' onClick={ goHome }/>
      { signIn && <AccountHeader user={user} /> }
    </header>
  )
}