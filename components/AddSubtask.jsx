import React from "react";
import styles from "@/components/styles/AddSubtask.module.css";
import IconCross from "./IconCross";

const AddSubtask = ({ onChange, value, id, onDelete }) => {
  return (
    <div id={id} className={styles.wrapper}>
      <div className={styles.subtaskDiv}>
        <input
          onChange={onChange}
          value={value}
          placeholder="e.g. Make coffee"
          className={styles.subtaskInput}
          type="text"
        />
      </div>
      <button onClick={onDelete} className={styles.crossButton}>
        <IconCross />
      </button>
    </div>
  );
};

export default AddSubtask;
