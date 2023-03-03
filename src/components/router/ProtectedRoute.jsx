import { TokenContext } from "../../contexts/TokenProvider"
import { Navigate } from "react-router-dom"
import { useContext } from "react"

export default function ProtectedRoute({ children }) {
  const { token } = useContext(TokenContext)

  return token ? children : <Navigate to="/login" />
}
