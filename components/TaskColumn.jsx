"use client";
import React from "react";
import styles from "@/components/styles/TaskColumn.module.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({ column, color, onTaskClick, setViewTaskOpen }) => {
  const tasks = column?.tasks;
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.titleDiv}>
        <div style={{ backgroundColor: color }} className={styles.dot}></div>{" "}
        <h4 className={styles.columnTitle}>
          {column.name} ({column.tasks.length})
        </h4>
      </div>
      {tasks.map((task) => (
        <TaskCard
          setViewTaskOpen={setViewTaskOpen}
          onTaskClick={onTaskClick}
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
