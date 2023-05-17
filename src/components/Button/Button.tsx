import { ReactNode } from "react";
import styles from "./button.module.css";

type ButtonType = "primaryPurple" | "primaryBlue" | "dark" | "danger";

interface MyProps {
  type?: ButtonType;
  onClick?: () => void;
  children?: ReactNode;
}

function Button({ type = "primaryPurple", children, onClick }: MyProps) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
export default Button;
