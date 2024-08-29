import React from "react";
import Overlay from "./Overlay";
import styles from "@/components/styles/DeleteModal.module.css";

const DeleteModal = ({ onDelete, onCancel, modal, modalType }) => {
  return (
    <Overlay>
      <div className={styles.outerWrapper}>
        <div className={styles.innerWrapper}>
          <h2 className={styles.title}>Delete this {modalType}?</h2>
          <p className={styles.description}>
            Are you sure you want to delete the ‘
            {modal.name ? modal.name : modal.title}’ {modalType}?{" "}
            {modal.name
              ? "This action will remove all columns and tasks and cannot be reversed."
              : "This action cannot be reversed"}
          </p>
          <div className={styles.buttonsFlex}>
            <button onClick={onDelete} className={styles.buttonDelete}>
              Delete
            </button>
            <button onClick={onCancel} className={styles.buttonCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteModal;
