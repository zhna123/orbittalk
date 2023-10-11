import { redirect } from "react-router-dom"
import { Inputs as RegisterInputs } from "../components/Register"
import { Inputs as PWDInputs } from "../components/account/Security"
import { Inputs as SearchUserInputs } from "../components/account/AddFriendModule"
import { User } from "../types"
import { SERVER_URL } from "../util/constant"

export const registerUser = async (data: RegisterInputs) => {
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

export const changePassword = async(data: PWDInputs) => {
  try {
    const res = await fetch(`${SERVER_URL}/users/password`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (res.status === 200) {
      console.log('password changed!')
      return [true, []]
    } else {
      console.log('failed change pwd')
      const msg = await res.json()
      return [false, msg]
    }
  } catch(e) {
    console.log('error when changing password:' + e)
    return [false, []]
  }
}

export const findUserByName = async (data: SearchUserInputs) => {
  try {
    const res = await fetch(`${SERVER_URL}/users/username/${data.username}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (res.status === 200) {
      const resultUser = await res.json();
      return resultUser
    } 
    console.log(`user ${data.username} doesn't exist.`)
    return null
  } catch (e) {
    console.log(`error finding friend with username: ${data.username}`)
    return null
  }
}