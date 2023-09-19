import { redirect } from "react-router-dom"
import { Inputs } from "../components/Register"
import { User } from "../types"
import { SERVER_URL } from "../util/constant"

export const registerUser = async (data: Inputs) => {
  try {
    const res = await fetch(`${SERVER_URL}/sign-up`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result = await res.json()
    if (res.status === 201) {
      console.log("user registered successful")
      return [true, result]
    } else {
      console.log("user failed to register")
      return [false, result]
    }
  } catch (e) {
    console.log("error when register:" + e)
    return [false, {}]
  }
}

export const findFriends = async (user: User) => {

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