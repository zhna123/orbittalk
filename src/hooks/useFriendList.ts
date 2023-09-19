import { useContext, useEffect, useState } from "react";
import { User } from "../types";
import { AppContext } from "../App";
import { findFriends } from "../api/user";


export function useFriendList() {

  const { user, updateUserFriendList } = useContext(AppContext)

  const [friendList, setFriendList] = useState<(User|null)[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addFriend = (friend: User) => {
    updateUserFriendList([...friendList, friend])
    setFriendList([...friendList, friend])
  }
  
  useEffect(() => {
    const retrieveFriends = async () => {

      setIsLoading(true)
      const friends = await findFriends(user!);
      setFriendList(friends)
      setIsLoading(false)
      
    }
    retrieveFriends()
  }, [])

  return { friendList, isLoading, addFriend }
}