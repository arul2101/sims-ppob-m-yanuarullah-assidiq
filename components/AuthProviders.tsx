import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if(!authContext) {
    throw new Error("useAuth must be within a AuthProvider!");
  }

  return authContext;
}

const AuthProvider = ({children}) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // const response = await ...;
        // setToken() //todo
      } catch (error) {
        setToken(null);
      }

      fetchMe();
    }
  }, [])
}