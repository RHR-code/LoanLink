import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
const Toggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center"
    >
      {theme === "dark" ? (
        <MdLightMode className="text-2xl" />
      ) : (
        <MdDarkMode className="text-2xl" />
      )}
    </div>
  );
};

export default Toggle;
