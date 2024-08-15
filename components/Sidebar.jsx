"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/styles/Sidebar.module.css";
import Image from "next/image";
import { useTheme } from "next-themes";
import logoLight from "@/public/assets/logo-light.svg";
import logoDark from "@/public/assets/logo-dark.svg";
import showSidebarIcon from "@/public/assets/icon-show-sidebar.svg";
import BoardButton from "./BoardButton";
import ThemeSwitcher from "./ThemeSwitcher";

const Sidebar = ({ activeBoard, setActiveBoard }) => {
  const [boards, setBoards] = useState([]);
  const [hideButtonClicked, setHideButtonClicked] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await fetch("/api/boards");
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error("Error fetching boards: ", error);
      }
    }

    fetchBoards();
  }, []);

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
            <h4 className={styles.boardsTitle}>All Boards (3)</h4>
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
