import { useContext, useEffect, useState } from "react";
import { User } from "../types";
import { AppContext } from "../App";
import { redirect } from "react-router-dom";
import { SERVER_URL } from "../util/constant";



export function useFriendList() {

  const { user, updateUserFriendList } = useContext(AppContext)

  const [friendList, setFriendList] = useState<(User|null)[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addFriend = (friend: User) => {
    updateUserFriendList([...friendList, friend])
    setFriendList([...friendList, friend])
  }

  const findFriends = async (user: User) => {

      const friendIds: string[] = user.friends;
  
        const friendsPromises: Promise<User | null>[] = friendIds.map(async id => {
        const res = await fetch(`${SERVER_URL}/users/${id}`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          }
        })
        if (res.status === 200) {
          const friend: User = await res.json()
          return friend;
        } else if (res.status === 401 || res.status === 403) {
          redirect('/')
          return null
        } else {
          console.log(`Failed to retrieve friend data for user ID: ${id}`);
          return null
        }
      })
      const friendsData = await Promise.all(friendsPromises)
      const filteredData = friendsData.filter(data => data !== null);
      return filteredData
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