import React from "react";
import styles from "@/components/styles/TaskColumn.module.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({ column, color }) => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.titleDiv}>
        <div style={{ backgroundColor: color }} className={styles.dot}></div>{" "}
        <h4 className={styles.columnTitle}>
          {column.name} ({column.tasks.length})
        </h4>
      </div>
      {column.tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          totalSubtasks={task.subtasks.length}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
