import { createContext, useEffect, useState } from 'react'
import { Router } from './Router'
import { User } from './types';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import { Buffer } from 'buffer';
import { SERVER_URL } from './util/constant';


interface AppContextProps {
  signIn: boolean;
  handleSignIn: () => void;
  handleSignOut: () => void;
  user: User | null;
  updateUserAvatar: (a: Buffer) => void
  updateUserFriendList: (list: (User|null)[]) => void
}

export const AppContext = createContext<AppContextProps>({
  signIn: false,
  handleSignIn: () => {},
  handleSignOut: () => {},
  user: null,
  updateUserAvatar: () => {},
  updateUserFriendList: () => {}
})

const getAuthUser = async () => {
  const res = await fetch(`${SERVER_URL}/users`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 401 || res.status === 403){
  
    return redirect('/')
  }
  return null
}

const setOnlineStatus = async (user: User, online: boolean) => {
  const isOnline = user.is_online
  if (isOnline === online) return
  const res = await fetch(`${SERVER_URL}/users/status?isOnline=${online}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (res.status === 200) {
    console.log("successfully updated status")
  } else {
    console.log("failed update status")
  }
}

function App() {
  const [signIn, setSignIn] = useState<boolean>(false)
  const [user, setUser] = useState<User|null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const jwtExpiration = Cookies.get('jwtExpiration')
      if (jwtExpiration) {
        const jwtExpirationTS = Date.parse(jwtExpiration);
        const currentTimestamp = new Date().getTime();
  
        if (currentTimestamp < jwtExpirationTS) {
          // JWT is not expired
          console.log('JWT is valid');
          
          const authUser = await getAuthUser();
          if (authUser !== null) {
            setUser(authUser)
            setSignIn(true)
          } else {
            console.log("error getting authenticated user when checking authentication")
          }
        } 
      }
    }
    checkAuth()
    return () => {
      setSignIn(false)
      setUser(null)
    }
  }, [])

  const updateUserAvatar = (avatar: Buffer) => {
    setUser({...user!, avatar: avatar})
  }

  const updateUserFriendList = (friendList: (User|null)[]) => {

    const friendIdList: string[] = friendList.map(f => f!._id);
    setUser({...user!, friends: friendIdList})
  }

  const handleSignIn = async () => {
    const authUser = await getAuthUser();
    if (authUser !== null) {
      setOnlineStatus(authUser, true)
      setUser({...authUser, is_online: true})
      setSignIn(true)
    } else {
      console.log("error getting authenticated user when signing in")
    }
  }

  // TODO need to blacklist tokens on backend
  // TODO set offline circle
  const handleSignOut = async () => {
    const authUser = await getAuthUser();
    setOnlineStatus(authUser, false)
    setUser({...authUser, is_online: false})

    Cookies.remove('jwtExpiration')
    setSignIn(false)
  }

  return (
    <AppContext.Provider value={{ signIn, user, updateUserAvatar, updateUserFriendList, handleSignIn, handleSignOut }}>
      <Router />
    </AppContext.Provider>
  )
}

export default App
