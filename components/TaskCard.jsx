import React from "react";
import styles from "@/components/styles/TaskCard.module.css";

const TaskCard = ({ title, totalSubtasks }) => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <h3 className={styles.taskTitle}>{title}</h3>
        <p className={styles.taskText}>0 of {totalSubtasks} subtasks</p>
      </div>
    </div>
  );
};

export default TaskCard;
