import React from "react";
import styles from "@/components/styles/AddButton.module.css";

const AddButton = ({ text, disabled }) => {
  return (
    <button disabled={disabled} className={styles.addButton}>
      <h3 className={styles.buttonTitle}>{text}</h3>
    </button>
  );
};

export default AddButton;
