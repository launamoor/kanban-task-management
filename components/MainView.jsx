import React from "react";
import styles from "@/components/styles/MainView.module.css";
import Board from "./Board";

const MainView = ({ boards }) => {
  return (
    <main className={styles.outerWrapper}>
      <Board boards={boards} />
    </main>
  );
};

export default MainView;
