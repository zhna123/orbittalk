import { Header } from "./components/Header"
import { Outlet } from "react-router-dom";

export const Layout = () => {
  
  return (
    <div className="px-2 sm:px-8 py-4 min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  )
}