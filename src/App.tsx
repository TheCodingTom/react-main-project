import { createContext, useState } from "react";
import "./App.css";
import Countries from "./pages/Countries";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light")
      
    )
  }

  return (
    <ThemeContext.Provider value={{theme, handleThemeChange}}>
      <div className="App" id={theme}>
      <div className="switch">
          <ReactSwitch onChange={handleThemeChange} checked={theme === "dark"}/>
        </div>
      
        <Countries />
        
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
