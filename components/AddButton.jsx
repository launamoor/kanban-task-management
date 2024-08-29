import React from "react";
import styles from "@/components/styles/AddButton.module.css";

const AddButton = ({ text, disabled, onClick }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.addButton}>
      <h3 className={styles.buttonTitle}>{text}</h3>
    </button>
  );
};

export default AddButton;
