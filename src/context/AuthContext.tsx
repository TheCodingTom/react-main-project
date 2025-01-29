//3. define provider props type

type AuthContextProviderProps = {
  children: ReactNode;
};

//5. define context type

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

//6. create variable with context initial value

const contextInitialValue: AuthContextType = {
  user: null,
  login: () => {
    throw Error("context not initialised");
  },
  logout: () => {
    throw Error("context not initialised");
  },
};

//1. create and export the context

import { createContext, ReactNode, useState } from "react";
import { User } from "../types/customTypes";

export const AuthContext = createContext<AuthContextType>(contextInitialValue);

//2. create and export the provider: a component that contains states, functions, etc., that I want to share

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  //4. create in (or move to) the provider all states/functions you wanna share

  const user1: User = {
    username: "Thom",
    email: "thom@test.com",
  };
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser(user1);
  };

  const logout = () => {
    setUser(null);
  };

  //7. include elements you wanna share in provider property value

  return <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>;
};
