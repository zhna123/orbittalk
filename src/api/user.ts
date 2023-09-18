import { Inputs } from "../components/Register"
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