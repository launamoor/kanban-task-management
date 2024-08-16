import React, { useEffect, useState } from "react";
import styles from "@/components/styles/Board.module.css";
import AddButton from "./AddButton";
import TaskColumn from "./TaskColumn";

const Board = ({ boards }) => {
  const columns = boards[0]?.columns;
  return (
    <>
      {boards.length === 0 ? (
        <div className={styles.emptyBoard}>
          <div className={styles.emptyBoardInner}>
            <h2 className={styles.emptyBoardTitle}>
              This board is empty. Create a new column to get started.
            </h2>
            <AddButton text={"+ Add New Column"} />
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.columnGrid}>
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                column={column}
                color={column.color}
              />
            ))}
            <div className={styles.newColumnButtonDiv}>
              <button className={styles.newColumnButton}>+ New Column</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
