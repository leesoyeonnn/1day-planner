import { createContext, useContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  }
  
  useEffect(() => {
    const isDark = (localStorage.theme === 'dark') || 
      (!('theme' in localStorage) && matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, [])

  return <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
    {children}
  </DarkModeContext.Provider> 
}

export const useDarkMode = () => useContext(DarkModeContext);

function updateDarkMode(isDark) {
  if(isDark) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}