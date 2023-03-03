import { Link, NavLink } from "react-router-dom"
import { TokenContext } from "../../contexts/TokenProvider"
import { useContext } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/profile", label: "Profile" },
]
export function Navigation() {
  const { token, setToken } = useContext(TokenContext)
  const navigate = useNavigate()

  return (
    <nav className="w-full">
      <ul className="flex flex-row justify-between items-center w-full max-w-xl mx-auto py-4 text-white">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className={({ isActive }) => (isActive ? "underline underline-offset-4" : "")}>
              {link.label}
            </NavLink>
          </li>
        ))}
        {token ? (
          <li>
            <button
              onClick={() => {
                setToken(null)
                toast.success("You have been logged out!")
                navigate("/")
              }}
              className="border-black border px-3 rounded-full hover:text-red-600 transition-colors duration-200">
              Log out
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "underline underline-offset-4" : "")}>
              Log in
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}
