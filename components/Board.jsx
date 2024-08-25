"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/styles/Board.module.css";
import AddButton from "./AddButton";
import TaskColumn from "./TaskColumn";
import Overlay from "./Overlay";
import ViewTaskModal from "./ViewTaskModal";
import AddNewBoardModal from "./AddNewBoardModal";
import Loading from "@/app/loading";
import { useAppContext } from "@/context/appContext";

const Board = ({ board, activeTask, setActiveTask, setData, data }) => {
  const [loading, setLoading] = useState(true);
  const columns = board?.columns;
  const {
    viewTaskOpen,
    setViewTaskOpen,
    taskID,
    setTaskID,
    closeModal,
    addNewBoardOpen,
  } = useAppContext();

  // Fetch individual task
  useEffect(() => {
    async function fetchTask() {
      try {
        if (taskID) {
          setLoading(true);
          const response = await fetch(`/api/tasks/${taskID}`);
          if (!response.ok) {
            throw new Error("Error fetching board");
          }
          const data = await response.json();
          setActiveTask(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchTask();
  }, [taskID]);

  const handleTaskClick = (taskID) => {
    setTaskID(taskID);
    setViewTaskOpen(true);
  };

  const handleStatusChange = async (subtaskId, isCompleted) => {
    try {
      const response = await fetch(`/api/subtasks/${subtaskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted }),
      });

      if (!response.ok) {
        throw new Error("Failed to update subtask");
      }

      const updatedSubtask = await response.json();
      setActiveTask((prevTask) => {
        const updatedSubtasks = prevTask.subtasks.map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, isCompleted: updatedSubtask.isCompleted }
            : subtask
        );

        return {
          ...prevTask,
          subtasks: updatedSubtasks,
        };
      });
    } catch (error) {
      console.error("Error updating subtask:", error);
    }
  };

  if (!board) return <Loading />;

  return (
    <>
      {viewTaskOpen && activeTask && (
        <Overlay onModalClose={closeModal}>
          <ViewTaskModal
            handleStatusChange={handleStatusChange}
            loading={loading}
            activeTask={activeTask}
            setActiveTask={setActiveTask}
            board={board}
          />
        </Overlay>
      )}
      {addNewBoardOpen && (
        <Overlay onModalClose={closeModal}>
          <AddNewBoardModal data={data} setData={setData} />
        </Overlay>
      )}
      {board?.length === 0 ? (
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
                onTaskClick={(e) => handleTaskClick(e.currentTarget.id)}
                key={column.id}
                column={column}
                color={column.color}
                setViewTaskOpen={setViewTaskOpen}
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
