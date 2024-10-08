"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/styles/MainView.module.css";
import Board from "./Board";
import Loading from "@/app/loading";

const MainView = ({
  boards,
  activeTask,
  setActiveTask,
  setData,
  data,
  activeBoard,
  setActiveBoard,
  setTasks,
  tasks,
}) => {
  const [boardToDisplay, setBoardToDisplay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (boards) {
      setBoardToDisplay(boards[0]);
      setLoading(false);
    }
  }, [boards, boardToDisplay]);

  if (loading) return <Loading />;
  return (
    <main className={styles.outerWrapper}>
      <Board
        setActiveBoard={setActiveBoard}
        activeBoard={activeBoard}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        board={boardToDisplay}
        setData={setData}
        data={data}
        setTasks={setTasks}
        tasks={tasks}
      />
    </main>
  );
};

export default MainView;
