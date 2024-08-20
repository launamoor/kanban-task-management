"use client";
import React, { useState } from "react";
import styles from "@/components/styles/Subtask.module.css";

const Subtask = ({ subtask, onStatusChange }) => {
  const [displayedSubtask, setDisplayedSubtask] = useState(subtask);
  const [ready, setReady] = useState(true);
  const handleCheckboxChange = async (e) => {
    setReady(false);
    const isChecked = !displayedSubtask.isCompleted;

    await onStatusChange(subtask.id, isChecked);
    setDisplayedSubtask((prev) => ({
      ...prev,
      isCompleted: isChecked,
    }));
    setReady(true);
  };

  // Fix delay in updating state

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <input
          disabled={!ready}
          checked={displayedSubtask.isCompleted}
          className={styles.checkbox}
          type="checkbox"
          onChange={handleCheckboxChange}
        />
        <span
          onClick={handleCheckboxChange}
          className={`${styles.customCheckbox} ${
            displayedSubtask.isCompleted ? "" : styles.checkboxBorder
          }`}
        >
          {displayedSubtask.isCompleted ? (
            <div className={styles.customCheckboxInner}>
              <svg
                className={styles.customCheckboxIcon}
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.27588 3.06597L4.03234 5.82243L9.03234 0.822433"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          ) : null}
        </span>
        <p
          className={
            displayedSubtask.isCompleted
              ? styles.subtaskTitleCompleted
              : styles.subtaskTitle
          }
        >
          {displayedSubtask.title}
        </p>
      </div>
    </div>
  );
};

export default Subtask;
