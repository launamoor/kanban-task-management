"use client";
import React from "react";
import { RingLoader } from "react-spinners";
import styles from "@/components/styles/Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <RingLoader color="#635fc7" size={150} />
    </div>
  );
};

export default Loading;
