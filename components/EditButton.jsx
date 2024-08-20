import React from "react";
import menuIcon from "@/public/assets/icon-vertical-ellipsis.svg";
import styles from "@/components/styles/EditButton.module.css";
import { useAppContext } from "@/context/appContext";
import Image from "next/image";

const EditButton = ({ id }) => {
  const { handleOpenMenu, menuOpen, anim } = useAppContext();

  return (
    <>
      <button
        id={id}
        onClick={() => handleOpenMenu(styles.scaleOut)}
        className={styles.menuButton}
      >
        <Image src={menuIcon} alt="Menu Icon" />
      </button>
      {menuOpen && (
        <div className={`${styles.editPopupDiv} ${anim}`}>
          <button className={styles.popupButtonEdit}>Edit Board</button>
          <button className={styles.popupButtonDelete}>Delete Board</button>
        </div>
      )}
    </>
  );
};

export default EditButton;
