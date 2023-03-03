import axios from "axios";
import { useState, useContext, useEffect } from "react";
import Loader from "../global/Loader";
import { TokenContext } from "../../contexts/TokenProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenCookie, setTokenCookie] = useCookie("token", undefined);
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:4000/auth/token", {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          if (event.target.remember.checked) {
            const milliseconds = response.data.validUntil - Date.now();
            const validFor = milliseconds / (1000 * 60 * 60 * 24);
            setTokenCookie(JSON.stringify(response.data), {
              days: validFor,
              SameSite: "strict",
            });
          } else {
            setTokenCookie(JSON.stringify(response.data), {
              SameSite: "strict",
            });
          }
          setToken(response.data);
          toast.success("Login successful!");
        }
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    if (token) navigate("/profile");
  }, [token]);
  return (
    <div className="flex flex-col justify-center py-6 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="relative bg-black px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mx-auto max-w-md">
            <div>
              <h1 className="text-2xl font-semibold">Login Here!</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={submitHandler} className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="username"
                    name="username"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-white bg-transparent text-mainWhite placeholder-transparent focus:outline-none"
                    placeholder="Username"
                  />
                  <label
                    htmlFor="username"
                    className="peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-dimWhite transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-dimWhite/50">
                    Username
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer h-10 w-full border-b-2 border-white bg-transparent text-mainWhite placeholder-transparent focus:outline-none"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-sm text-dimWhite transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-dimWhite peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-dimWhite/50">
                    Password
                  </label>
                </div>
                <div>
                  <label htmlFor="remember" className="flex items-center text-white">
                    <input name="remember" id="remember" type="checkbox" className="mr-2" />
                    Remember me
                  </label>
                </div>
                <div className="relative">
                  <button type="submit" aria-label="submit" className="w-full  rounded-md border-2 border-white bg-black px-2 py-1.5 text-lg text-white">
                    {isLoading ? <Loader /> : "Log in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
