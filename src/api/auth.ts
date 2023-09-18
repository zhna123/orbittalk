import { SERVER_URL } from "../util/constant"
import { Inputs } from "../components/SignIn"


export const signInUser = async (data: Inputs) => {
    
  try {
    const res = await fetch(`${SERVER_URL}/auth/login`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (res.status === 201) {
      console.log("log in succeed.")
      return true
    } else {
      console.log("log in failed.")
      return false
    }
  } catch (e) {
    console.log("error when log in:" + e)
    return false
  }
}