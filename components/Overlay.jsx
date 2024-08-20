import React from "react";
import styles from "@/components/styles/Overlay.module.css";

const Overlay = ({ children, onModalClose }) => {
  return (
    <div onClick={onModalClose} id="overlay" className={styles.overlay}>
      {children}
    </div>
  );
};

export default Overlay;
