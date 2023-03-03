import axios from "axios"
import { useState, useContext, useEffect } from "react"
import Loader from "../global/Loader"
import { TokenContext } from "../../contexts/TokenProvider"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import useCookie from "react-use-cookie"
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [tokenCookie, setTokenCookie] = useCookie("token", undefined)
  const { token, setToken } = useContext(TokenContext)
  const navigate = useNavigate()
  function submitHandler(event) {
    event.preventDefault()
    setIsLoading(true)
    axios
      .post("http://localhost:4000/auth/token", {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setTokenCookie(JSON.stringify(response.data), {
            reponse.data.validUntil 
          })
          setToken(response.data)
          toast.success("Login successful!")
        }
      })
      .catch((error) => {
        console.log(error.message)
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    if (token) navigate("/profile")
  }, [token])
  return (
    <div className="py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-black shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login Here!</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={submitHandler} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="username"
                    name="username"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 bg-transparent border-white text-mainWhite focus:outline-none"
                    placeholder="Username"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-0 -top-3.5 text-dimWhite text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-dimWhite/50 peer-focus:text-sm">
                    Username
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent bg-transparent h-10 w-full border-b-2 border-white text-mainWhite focus:outline-none"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-dimWhite text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-dimWhite peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-dimWhite/50 peer-focus:text-sm">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button type="submit" aria-label="submit" className="bg-black  border-white border-2 text-white text-lg rounded-md px-2 py-1.5 w-full">
                    {isLoading ? <Loader /> : "Log in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
