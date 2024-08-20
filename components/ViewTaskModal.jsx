"use client";
import React from "react";
import styles from "@/components/styles/ViewTaskModal.module.css";
import Loading from "@/app/loading";
import Subtask from "./Subtask";
import EditButton from "./EditButton";

const ViewTaskModal = ({
  activeTask,
  setActiveTask,
  loading,
  handleStatusChange,
  board,
}) => {
  const columns = board.columns;
  // Calculate completed subtasks
  const completedCount = activeTask.subtasks.reduce((acc, subtask) => {
    if (subtask.isCompleted) acc++;
    return acc;
  }, 0);

  const updateTaskColumn = async (e) => {
    const desiredColumn = e.target.value;

    // Optimistically update state
    setActiveTask((prev) => ({
      ...prev,
      columnId: desiredColumn,
    }));

    // Update database
    try {
      const response = await fetch(`/api/tasks/${activeTask.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ columnId: desiredColumn }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task column");
      }

      // Optionally, confirm the state update if needed
      const updatedTask = await response.json();
      setActiveTask((prev) => ({
        ...prev,
        columnId: updatedTask.columnId, // Ensure the state matches the database
      }));
    } catch (error) {
      console.error("Error updating task column:", error);
      // Revert state update if the database update fails
      setActiveTask((prev) => ({
        ...prev,
        columnId: activeTask.columnId, // Revert to previous state
      }));
    }
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.titleDiv}>
          <h2 className={styles.title}>{activeTask.title}</h2>
          <EditButton id={"task"} />
        </div>
        <p className={styles.description}>{activeTask.description}</p>
        <div className={styles.subtasksDiv}>
          <p className={styles.subtasksTitle}>
            Subtasks {completedCount} of {activeTask.subtasks.length}
          </p>
          {activeTask.subtasks.map((subtask) => (
            <Subtask
              key={subtask.id}
              subtask={subtask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
        <div className={styles.currentStatusDiv}>
          <p>Current Status</p>
          <div className={styles.dropdown}>
            <select
              onChange={(e) => updateTaskColumn(e)}
              className={styles.select}
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
            <svg
              className={styles.dropdownIcon}
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.79834 1.54863L5.49682 6.24711L10.1953 1.54863"
                stroke="#635FC7"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
