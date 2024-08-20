import React, { useEffect, useState } from "react";
import styles from "@/components/styles/TopBar.module.css";
import AddButton from "./AddButton";
import menuIcon from "@/public/assets/icon-vertical-ellipsis.svg";
import Image from "next/image";
import EditButton from "./EditButton";
import { useAppContext } from "@/context/appContext";

const TopBar = ({ activeBoard, boards }) => {
  const [board, setBoard] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <h1>{board?.name}</h1>
        <div className={styles.newTaskDiv}>
          <AddButton disabled={boards.length === 0} text={"+ Add New Task"} />
          <EditButton id={"board"} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
