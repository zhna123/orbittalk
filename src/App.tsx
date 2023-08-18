import { createContext, useState } from 'react'
import { Router } from './Router'

export const AppContext = createContext({
  signIn: false
})

function App() {
  const [signIn, setSignIn] = useState<boolean>(false)

  return (
    <AppContext.Provider value={{ signIn }}>
      <Router />
    </AppContext.Provider>
  )
}

export default App
