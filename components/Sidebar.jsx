"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/styles/Sidebar.module.css";
import Image from "next/image";
import { useTheme } from "next-themes";
import logoLight from "@/public/assets/logo-light.svg";
import logoDark from "@/public/assets/logo-dark.svg";
import BoardButton from "./BoardButton";
import ThemeSwitcher from "./ThemeSwitcher";

const Sidebar = ({ activeBoard, setActiveBoard }) => {
  const [boards, setBoards] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
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

  const hideButton = () => {
    setStartAnimation(true);
    setTimeout(() => {
      setSidebarHidden(true);
    }, 500);
  };
  return (
    <aside
      className={`${styles.outerWrapper} ${
        sidebarHidden ? styles.outerWrapperHidden : ""
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
                <BoardButton boardIcon createNew text={"+ Create New Board"} />
              </li>
            </ul>
          </nav>
        </div>
        <ThemeSwitcher />
        {!sidebarHidden && (
          <BoardButton
            customClasses={`${styles.hideButton} ${
              !startAnimation ? "" : styles.hideButtonAnimation
            }`}
            hideIcon
            hidden={false}
            text={"Hide Sidebar"}
            onClick={hideButton}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
