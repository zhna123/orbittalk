import { createContext, useState } from 'react'
import { Router } from './Router'

export const AppContext = createContext({
  signIn: false,
  handleSignIn: () => {}
})

function App() {
  const [signIn, setSignIn] = useState<boolean>(false)

  const handleSignIn = () => {
    setSignIn(true)
  }

  return (
    <AppContext.Provider value={{ signIn, handleSignIn }}>
      <Router />
    </AppContext.Provider>
  )
}

export default App
