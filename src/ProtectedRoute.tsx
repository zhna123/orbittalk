import { useContext } from "react"
import { AppContext } from "./App"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { signIn } = useContext(AppContext)

  if (!signIn) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{ children }</>
}

export default ProtectedRoute