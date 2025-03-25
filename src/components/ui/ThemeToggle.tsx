import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference
    const isDarkMode = localStorage.getItem("theme") === "dark";
    setDarkMode(isDarkMode);

    // Apply the theme to the document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Save theme preference to local storage
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");

    // Apply the theme to the document
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <FaSun className="h-5 w-5 text-yellow-500" />
      ) : (
        <FaMoon className="h-5 w-5 text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
