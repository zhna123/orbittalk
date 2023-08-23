import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AccountBoard } from './components/account/AccountBoard.tsx';
import { Layout } from './Layout.tsx';
import { Home } from "./components/Home.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { Profile } from "./components/account/Profile.tsx";
import { Security } from "./components/account/Security.tsx";
import { Friends } from "./components/account/Friends.tsx";
import { Notifications } from "./components/account/Notifications.tsx";

export const Router = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "account",
          element: (
            <ProtectedRoute>
              <AccountBoard />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element:  <Profile />
            },
            {
              path: "security",
              element: <Security />
            },
            {
              path: "friends",
              element: <Friends />
            },
            {
              path: "notifications",
              element: <Notifications />
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={ router } />
}