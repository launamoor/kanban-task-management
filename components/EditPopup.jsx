import React from "react";
import styles from "@/components/styles/EditPopup.module.css";

const EditPopup = ({ anim, className, style, onDelete }) => {
  return (
    <div style={style} className={`${className} ${anim}`}>
      <button className={styles.popupButtonEdit}>Edit Board</button>
      <button onClick={onDelete} className={styles.popupButtonDelete}>
        Delete Board
      </button>
    </div>
  );
};

export default EditPopup;
