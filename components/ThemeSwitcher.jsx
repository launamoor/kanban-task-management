"use client";
import { useTheme } from "next-themes";
import styles from "@/components/styles/ThemeSwitcher.module.css";
import iconLight from "@/public/assets/icon-light-theme.svg";
import iconDark from "@/public/assets/icon-dark-theme.svg";
import Image from "next/image";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <Image src={iconLight} alt="Icon Light Theme" />
        <div className={styles.switchWrapper}>
          <div
            style={
              theme === "dark"
                ? { transform: "translate(90%, -50%)" }
                : { transform: "translate(-50%, -50%)" }
            }
            className={styles.switchDot}
          ></div>
          <input
            checked={theme === "dark"}
            type="checkbox"
            onChange={handleThemeChange}
          />
        </div>
        <Image src={iconDark} alt="Icon Dark Theme" />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
