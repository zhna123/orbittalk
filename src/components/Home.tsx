import { useContext, useState } from 'react'
import { SignIn } from './SignIn'
import { Register } from './Register'
import { ChatBoard } from './main/ChatBoard'
import { AppContext } from '../App'


export function Home() {

  const { signIn } = useContext(AppContext)

  const [signUp, setSignUp] = useState<boolean>(false)

  const showSignup = (show: boolean) => {
    setSignUp(show)
  }

  const credentialComp = () => {
    return (
      <>
        { signUp ? <Register showSignup={ showSignup } /> : <SignIn showSignup = { showSignup }/> }
      </>
    )
  }

  return (
    <>
      {
        signIn ? <ChatBoard /> : credentialComp()
      }  
    </>    
  )
}
