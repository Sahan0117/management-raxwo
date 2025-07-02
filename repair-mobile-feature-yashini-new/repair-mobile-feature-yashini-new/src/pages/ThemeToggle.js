import React from 'react';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div className="theme-toggle-container">
      <button
        className={`theme-toggle-btn ${darkMode ? 'dark' : 'light'}`}
        onClick={() => setDarkMode(!darkMode)}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="theme-icon">
          {darkMode ? (
            <svg className="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg className="sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" fill="black"/>
              <path d="M12 1V3" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 21V23" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4.22 4.22L5.64 5.64" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18.36 18.36L19.78 19.78" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M1 12H3" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M21 12H23" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4.22 19.78L5.64 18.36" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18.36 5.64L19.78 4.22" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;