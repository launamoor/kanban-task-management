import React from "react";
import styles from "@/components/styles/MainViewWrapper.module.css";

const MainViewWrapper = ({ children }) => {
  return <div className={styles.outerWrapper}>{children}</div>;
};

export default MainViewWrapper;
