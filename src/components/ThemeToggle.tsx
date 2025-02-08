import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // prevent dark theme to be removed when refreshing page
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light"); // set item theme to dark if isDarkTheme is true
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]); // class will be activate only when isDarkTheme is true, otherwise it will remove the dark theme

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <label className="switch">
        <input type="checkbox" checked={isDarkTheme} onClick={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </>
  );
};

export default ThemeToggle;
