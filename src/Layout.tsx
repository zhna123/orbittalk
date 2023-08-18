import { Header } from "./components/Header"
import { Outlet } from "react-router-dom";

export const Layout = () => {
  
  return (
    <div className="px-12 py-4 min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  )
}