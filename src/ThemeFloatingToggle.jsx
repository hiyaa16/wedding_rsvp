import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeFloatingToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const icon = theme === "dark" ? (
    // Sun (light mode)
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <g>
        <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/>
        <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
        <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/>
      </g>
    </svg>
  ) : (
    // Moon (dark mode)
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 0112.21 3a7 7 0 000 14A9 9 0 0121 12.79z"/>
    </svg>
  );

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      style={{
        position: "fixed",
        bottom: "10px",
        right: "62px",
        zIndex: 1000,
        background: theme === "dark" ? "#333" : "#FFF",
        color: theme === "dark" ? "#FFD700" : "#333",
        border: "none",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      {icon}
    </button>
  );
};

export default ThemeFloatingToggle;
