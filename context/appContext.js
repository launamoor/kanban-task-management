import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLocation, setMenuLocation] = useState("");
  const [anim, setAnim] = useState("");
  const [taskID, setTaskID] = useState(0);
  const [viewTaskOpen, setViewTaskOpen] = useState(false);
  const [addNewBoardOpen, setAddNewBoardOpen] = useState(false);
  const [deleteValidationOpen, setDeleteValidationOpen] = useState(false);
  const [deleteValidationTask, setDeleteValidationTask] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  // Open menu handler - START
  const handleOpenMenu = (animation, e) => {
    setMenuLocation(e.currentTarget.id);
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
  // Open menu handler - END

  // Close modal handler - START
  const closeModal = (e) => {
    if (e.target.id === "overlay") {
      setViewTaskOpen(false);
      setAddNewBoardOpen(false);
      setTaskID(0);
    }
  };
  // Close modal handler - END

  // Open add new board modal - START
  const openAddNewBoard = () => {
    setAddNewBoardOpen(true);
  };
  // Open add new board modal - END

  return (
    <AppContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        handleOpenMenu,
        anim,
        menuLocation,
        setMenuLocation,
        closeModal,
        taskID,
        setTaskID,
        viewTaskOpen,
        setViewTaskOpen,
        addNewBoardOpen,
        setAddNewBoardOpen,
        openAddNewBoard,
        deleteValidationOpen,
        setDeleteValidationOpen,
        addTaskModalOpen,
        setAddTaskModalOpen,
        deleteValidationTask,
        setDeleteValidationTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
