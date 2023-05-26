import { ReactNode } from "react";
import styles from "./button.module.css";
import { Link } from "react-router-dom";

type ButtonType = "primaryPurple" | "primaryBlue" | "dark" | "danger" | "clean";

interface ButtonProps {
  tabIndex?: number;
  type?: ButtonType;
  to?: string;
  onClick?: () => void;
  children?: ReactNode;
  ariaExpanded?: boolean;
  ariaControls?: string;
}

function Button({
  tabIndex = 0,
  type = "primaryPurple",
  to,
  children,
  ariaExpanded,
  ariaControls,
  onClick,
}: ButtonProps) {
  const content = (
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

  return to ? (
    <Link to={to} className={styles.linkWrapper}>
      {content}
    </Link>
  ) : (
    content
  );
}
export default Button;
