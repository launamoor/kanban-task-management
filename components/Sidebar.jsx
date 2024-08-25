"use client";
import React, { useState } from "react";
import styles from "@/components/styles/Sidebar.module.css";
import Image from "next/image";
import { useTheme } from "next-themes";
import logoLight from "@/public/assets/logo-light.svg";
import logoDark from "@/public/assets/logo-dark.svg";
import showSidebarIcon from "@/public/assets/icon-show-sidebar.svg";
import BoardButton from "./BoardButton";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAppContext } from "@/context/appContext";

const Sidebar = ({ activeBoard, setActiveBoard, boards }) => {
  const [hideButtonClicked, setHideButtonClicked] = useState(false);
  const { theme } = useTheme();
  const { openAddNewBoard } = useAppContext();

  const handleClick = (e) => {
    setActiveBoard(+e.currentTarget.id);
  };

  const handleHide = () => {
    setHideButtonClicked((prev) => !prev);
  };

  return (
    <>
      <aside
        className={`${styles.outerWrapper} ${
          hideButtonClicked ? styles.hide : ""
        }`}
      >
        <div className={styles.innerWrapper}>
          <div className={styles.logoWrapper}>
            <Image
              priority
              src={theme === "dark" ? logoLight : logoDark}
              alt="Kanban logo"
            />
          </div>
          <div className={styles.boardsDiv}>
            <h4 className={styles.boardsTitle}>All Boards ({boards.length})</h4>
            <nav>
              <ul className={styles.navList}>
                {boards.map((board) => (
                  <li key={board.id}>
                    <BoardButton
                      boardIcon
                      onClick={handleClick}
                      id={board.id}
                      text={board.name}
                      active={activeBoard === board.id}
                    />
                  </li>
                ))}
                <li>
                  <BoardButton
                    boardIcon
                    createNew
                    text={"+ Create New Board"}
                    onClick={openAddNewBoard}
                  />
                </li>
              </ul>
            </nav>
          </div>
          <ThemeSwitcher />

          <BoardButton
            customClasses={styles.hideButton}
            hideIcon
            hidden={false}
            text={"Hide Sidebar"}
            onClick={handleHide}
          />
        </div>
      </aside>
      {hideButtonClicked && (
        <button onClick={handleHide} className={styles.showSidebarButton}>
          <Image src={showSidebarIcon} alt="Show Sidebar Icon" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
