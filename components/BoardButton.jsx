import React from "react";
import styles from "@/components/styles/BoardButton.module.css";
import IconBoard from "./IconBoard";
import HideIcon from "./HideIcon";

const BoardButton = ({
  text,
  active,
  id,
  onClick,
  createNew,
  hidden,
  boardIcon,
  hideIcon,
  customClasses,
}) => {
  return (
    <button
      onClick={onClick}
      id={id}
      className={`${createNew ? styles.createNewButton : styles.navButton} ${
        active ? styles.buttonActive : ""
      } ${hidden && styles.buttonHidden} ${customClasses}`}
    >
      <div className={styles.buttonDiv}>
        {boardIcon && <IconBoard className={styles.iconBoard} />}
        {hideIcon && <HideIcon className={styles.iconBoard} />}
        <h3 className={styles.buttonTitle}>{text}</h3>
      </div>
    </button>
  );
};

export default BoardButton;
