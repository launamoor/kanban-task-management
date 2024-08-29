import React from "react";
import styles from "@/components/styles/EditPopup.module.css";

const EditPopup = ({ anim, className, style, onDelete, component }) => {
  return (
    <div id="popup" style={style} className={`${className} ${anim}`}>
      <button className={styles.popupButtonEdit}>Edit {component}</button>
      <button onClick={onDelete} className={styles.popupButtonDelete}>
        Delete {component}
      </button>
    </div>
  );
};

export default EditPopup;
