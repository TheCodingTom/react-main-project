import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]); // class will be activate only when isDarkTheme is true, otherwise it will remove the dark theme

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <label>
        <input type="checkbox" onClick={toggleTheme} /> <span>Dark Mode</span>
      </label>
    </>
  );
};

export default ThemeToggle;
