//3. define provider props type

type AuthContextProviderProps = {
    children: ReactNode
}


//1. create and export the context

import { createContext, ReactNode } from "react";

export const AuthContext = createContext()

//2. create and export the provider: a component that contains states, functions, etc., that I want to share

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
//4. create in (or move to) the provider all states/functions you wanna share

  return (
    <AuthContext.Provider value={}>
        {children}
    </AuthContext.Provider>
  )
}
