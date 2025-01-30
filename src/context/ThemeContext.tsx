import { createContext, ReactNode, useState } from "react";

type ThemeContextProviderProps = {
    children: ReactNode
}

type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: ()=>void
}

const contextInitialValue:ThemeContextType = {
darkMode: false,
toggleDarkMode: ()=>{throw new Error("context not initialised")}
}

export const ThemeContext = createContext<ThemeContextType>(contextInitialValue)

export const ThemeContextProvider = ({children}:ThemeContextProviderProps) => {

    const [darkMode, setDarkMode] = useState(false)
    const toggleDarkMode = () => {
      setDarkMode(!darkMode)
      console.log(darkMode);
    }

  return (
    <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
        {children}
    </ThemeContext.Provider>
  )
}