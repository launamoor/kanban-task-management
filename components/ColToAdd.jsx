import React from "react";
import styles from "@/components/styles/ColToAdd.module.css";
import IconCross from "./IconCross";

const ColToAdd = ({ onChange, value, id }) => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <input
          id={id}
          onChange={onChange}
          value={value}
          type="text"
          className={styles.colName}
        />
        <button className={styles.deleteButton}>
          <IconCross />
        </button>
      </div>
    </div>
  );
};

export default ColToAdd;
