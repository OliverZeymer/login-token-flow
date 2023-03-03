import { NavLink } from "react-router-dom";
import { TokenContext } from "../../contexts/TokenProvider";
import { useContext } from "react";
import LogoutButton from "./LogoutButton";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/profile", label: "Profile" },
];
export function Navigation() {
  const { token, setToken } = useContext(TokenContext);

  return (
    <nav className="w-full">
      <ul className="mx-auto flex w-full max-w-xl flex-row items-center justify-between py-4 text-white">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className={({ isActive }) => (isActive ? "underline underline-offset-4" : "")}>
              {link.label}
            </NavLink>
          </li>
        ))}
        {token ? (
          <li>
            <LogoutButton setToken={setToken} />
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
  );
}
