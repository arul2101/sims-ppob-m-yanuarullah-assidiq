'use client';

import { createContext, useContext, useState } from "react";


const AuthContext = createContext({});

export default function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);