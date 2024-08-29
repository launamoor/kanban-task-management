import React, { useEffect, useState } from "react";
import styles from "@/components/styles/TopBar.module.css";
import AddButton from "./AddButton";
import EditButton from "./EditButton";
import { useAppContext } from "@/context/appContext";
import EditPopup from "./EditPopup";

const TopBar = ({ activeBoard, boards, setActiveBoard, setData }) => {
  const [board, setBoard] = useState(null);
  const {
    menuOpen,
    anim,
    handleOpenMenu,
    menuLocation,
    setMenuOpen,
    setDeleteValidationOpen,
    setAddTaskModalOpen,
  } = useAppContext();

  useEffect(() => {
    async function fetchBoard() {
      try {
        const response = await fetch(`/api/boards/${activeBoard}`);
        if (!response.ok) {
          throw new Error("Error fetching board");
        }
        const data = await response.json();
        setBoard(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBoard();
  }, [activeBoard]);

  const onValidate = () => {
    setMenuOpen(false);
    setDeleteValidationOpen(true);
  };

  return (
    <header className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <h1>{board?.name}</h1>
        <div className={styles.newTaskDiv}>
          <AddButton
            onClick={() => setAddTaskModalOpen(true)}
            disabled={boards.length === 0}
            text={"+ Add New Task"}
          />
          <div style={{ position: "relative" }}>
            <EditButton
              id={"top-bar"}
              onClick={(e) => handleOpenMenu(styles.scaleOut, e)}
            />
            {menuOpen && menuLocation === "top-bar" && (
              <EditPopup
                onDelete={onValidate}
                anim={anim}
                className={styles.editPopupDiv}
                component={"Board"}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
