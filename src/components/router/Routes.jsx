import Layout from "../../Layout"
import HomePage from "../../pages/HomePage"
import ProfilePage from "../../pages/ProfilePage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "../../pages/LoginPage"
import TokenProvider from "../../contexts/TokenProvider"
import CustomToastContainer from "../global/CustomNotification"
import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <h1 className="text-7xl font-bold">About</h1> },

      { path: "login", element: <LoginPage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <h1 className="text-7xl font-bold">404</h1> },
    ],
  },
])
export default function Routes() {
  return (
    <TokenProvider>
      <CustomToastContainer top={true} />
      <RouterProvider router={router} />
    </TokenProvider>
  )
}
