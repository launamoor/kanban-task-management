import React from "react";
import styles from "@/components/styles/LayoutWrapper.module.css";

const LayoutWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default LayoutWrapper;
