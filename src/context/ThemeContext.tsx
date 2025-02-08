import { createContext, ReactNode, useState } from "react";

type ThemeContextProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
    theme: string;
    toggleTheme: ()=>void
}

const contextInitialValue:ThemeContextType = {
    theme: "light",
    toggleTheme: ()=>{throw new Error("context not initialised")}
    }

export const ThemeContext = createContext<ThemeContextType>(contextInitialValue);

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light")); // if the current theme is...
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className="App" id="light">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
