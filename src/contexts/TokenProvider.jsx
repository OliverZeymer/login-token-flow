import { createContext, useEffect, useState } from "react";
import { getCookie } from "react-use-cookie";
export const TokenContext = createContext(null);
export default function TokenProvider({ children }) {
  // const [tokenCookie] = useCookie("token");
  const [token, setToken] = useState(null);
  const tokenCookie = getCookie("token");
  useEffect(() => {
    if (!token && tokenCookie) {
      setToken(JSON.parse(tokenCookie));
    } else if (!tokenCookie) {
      setToken(null);
    }
  }, []);

  return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>;
}
