import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anim, setAnim] = useState("");

  const handleOpenMenu = (animation, e) => {
    if (menuOpen) {
      setAnim(animation);
      setTimeout(() => {
        setMenuOpen(false);
      }, 170);
    } else {
      setMenuOpen((prev) => !prev);
      setAnim("");
    }
  };

  return (
    <AppContext.Provider
      value={{
        menuOpen,
        handleOpenMenu,
        anim,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
