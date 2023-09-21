import LOGO from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../App';
import AccountHeader from './AccountHeader';


export function Header() {

  const { signIn, user } = useContext(AppContext)
  const navigate = useNavigate();

  const goHome = (e) => {
    if (e.type === 'click' || e.key === ' ' || e.key === 'Enter') {
      navigate("/");
    }
  }

  return (
    <header className="h-10 sm:h-16 flex justify-between items-start">
      <img src={ LOGO } alt="logo" className='h-6 sm:h-10 cursor-pointer' tabIndex={0} 
            onClick={ e => goHome(e) } onKeyDown={goHome}/>
      { signIn && <AccountHeader user={user} /> }
    </header>
  )
}