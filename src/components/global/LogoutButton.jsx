import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { setCookie } from "react-use-cookie";
export default function LogoutButton({ setToken }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        setToken(null);
        toast.success("You have been logged out!");
        navigate("/");
        setCookie("token", "", { days: 0 }); //remove token cookie
      }}
      className="rounded-full border border-white px-3 transition-colors duration-200 hover:text-red-600">
      Log out
    </button>
  );
}
