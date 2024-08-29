"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/styles/AddTaskModal.module.css";
import Overlay from "./Overlay";
import AddSubtask from "./AddSubtask";
import Loading from "@/app/loading";
import { useAppContext } from "@/context/appContext";

const AddTaskModal = ({ board, setTasks, tasks }) => {
  const columnsInBoard = board?.columns;
  const [loading, setLoading] = useState(false);
  const [subtasks, setSubtasks] = useState(0);
  const [taskToAdd, setTaskToAdd] = useState({
    columnId: board?.columns[0].id,
    description: "",
    id: 0,
    status: columnsInBoard[0].name,
    subtasks: [],
    title: "",
  });
  const [subtasksToAdd, setSubtasksToAdd] = useState([]);
  const { setAddTaskModalOpen } = useAppContext();

  useEffect(() => {
    // Fetch tasks
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/tasks");

        if (!response.ok) {
          throw new Error("Could not fetch tasks");
        }

        const data = await response.json();
        setTasks(data.length);
        setTaskToAdd((prev) => ({
          ...prev,
          id: tasks + 1,
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };
    fetchTasks();
  }, []);
  // Fetch subtasks
  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/subtasks");

        if (!response.ok) {
          throw new Error("Could not fetch subtasks");
        }

        const data = await response.json();
        setSubtasks(data.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subtasks: ", error);
      }
    };
    fetchSubtasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskToAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateTaskColumn = (e) => {
    const desiredColIndex = +e.target.value;
    const desiredCol = columnsInBoard.find((col) => col.id === desiredColIndex);

    setTaskToAdd((prev) => ({
      ...prev,
      columnId: +desiredColIndex,
      status: desiredCol.name,
    }));
  };

  const addSubtask = () => {
    const newSubtask = {
      id: subtasks + 1,
      isCompleted: false,
      taskId: taskToAdd.id,
      title: "",
    };

    setSubtasksToAdd((prev) => [...prev, newSubtask]);

    setSubtasks((prev) => prev + 1);
  };

  const handleSubtaskNameChange = (id, newName) => {
    setSubtasksToAdd((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, title: newName } : sub))
    );
  };

  const handleDeleteSubtask = (id) => {
    setSubtasksToAdd((prev) => prev.filter((sub) => sub.id !== id));

    setSubtasks((prev) => prev - 1);
  };

  const createNewTask = async () => {
    if (!taskToAdd.title.trim() || !taskToAdd.columnId) {
      console.error("Title or column ID is missing");
      return;
    }

    const newTask = {
      ...taskToAdd,
      subtasks: subtasksToAdd,
    };

    try {
      const response = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Failed to create new task");

      setTasks((prev) => prev + 1);
    } catch (error) {
      console.error("Error creating new task: ", error);
    } finally {
      setAddTaskModalOpen(false);
    }
  };

  if (loading)
    return (
      <Overlay>
        <Loading />
      </Overlay>
    );
  return (
    <Overlay>
      <div className={styles.outerWrapper}>
        <div className={styles.innerWrapper}>
          <h2>Add New Task</h2>
          <div className={styles.taskDetailsDiv}>
            <div className={styles.titleDiv}>
              <label className={styles.formLabel}>Title</label>
              <input
                name="title"
                placeholder="e.g. Take coffee break"
                type="text"
                className={styles.formInput}
                onChange={handleChange}
                value={taskToAdd.title}
              />
            </div>
            <div className={styles.descriptionDiv}>
              <label className={styles.formLabel}>Description</label>
              <textarea
                name="description"
                placeholder="e.g. Take coffee break"
                type="text"
                className={styles.formInputArea}
                onChange={handleChange}
                value={taskToAdd.description}
              />
            </div>
            <div className={styles.subtasksDiv}>
              <label className={styles.formLabel}>Subtasks</label>
              <div className={styles.subtasksFlex}>
                {subtasksToAdd.map((subtask, i) => (
                  <AddSubtask
                    key={i}
                    id={subtask.id}
                    value={subtask.title}
                    onChange={(e) =>
                      handleSubtaskNameChange(subtask.id, e.target.value)
                    }
                    onDelete={() => handleDeleteSubtask(subtask.id)}
                  />
                ))}
              </div>
              <button onClick={addSubtask} className={styles.addSubtaskButton}>
                + Add New Subtask
              </button>
            </div>
            <div className={styles.statusDiv}>
              <label className={styles.formLabel}>Status</label>
              <select className={styles.select} onChange={updateTaskColumn}>
                {columnsInBoard.map((col, i) => (
                  <option value={col.id} key={i}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={createNewTask} className={styles.createTaskButton}>
            Create Task
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default AddTaskModal;
