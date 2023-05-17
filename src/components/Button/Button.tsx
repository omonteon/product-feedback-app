import { ReactNode } from "react";
import styles from "./button.module.css";

type ButtonType = "primaryPurple" | "primaryBlue" | "dark" | "danger" | "clean";

interface ButtonProps {
  tabIndex?: number;
  type?: ButtonType;
  onClick?: () => void;
  children?: ReactNode;
  ariaExpanded?: boolean;
  ariaControls?: string;
}

function Button({
  tabIndex = 0,
  type = "primaryPurple",
  children,
  ariaExpanded,
  ariaControls,
  onClick,
}: ButtonProps) {
  return (
    <button
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      tabIndex={tabIndex}
      className={`${styles.button} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default Button;
