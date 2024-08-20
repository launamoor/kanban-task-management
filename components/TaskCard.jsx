"use client";
import React from "react";
import styles from "@/components/styles/TaskCard.module.css";

const TaskCard = ({ task, onTaskClick }) => {
  const subtasks = task?.subtasks;
  return (
    <button id={task?.id} onClick={onTaskClick} className={styles.taskButton}>
      <div className={styles.outerWrapper}>
        <div className={styles.innerWrapper}>
          <h3 className={styles.taskTitle}>{task?.title}</h3>
          <p className={styles.taskText}>
            {subtasks?.reduce((acc, curr) => {
              if (curr.isCompleted) acc++;
              return acc;
            }, 0)}{" "}
            of {subtasks?.length} subtasks
          </p>
        </div>
      </div>
    </button>
  );
};

export default TaskCard;
