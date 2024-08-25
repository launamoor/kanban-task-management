import React from "react";
import menuIcon from "@/public/assets/icon-vertical-ellipsis.svg";
import styles from "@/components/styles/EditButton.module.css";
import { useAppContext } from "@/context/appContext";
import Image from "next/image";

const EditButton = ({ id, onClick }) => {
  const { handleOpenMenu } = useAppContext();

  return (
    <button id={id} onClick={onClick} className={styles.menuButton}>
      <Image src={menuIcon} alt="Menu Icon" />
    </button>
  );
};

export default EditButton;
