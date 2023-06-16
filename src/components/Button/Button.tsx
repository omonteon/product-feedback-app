import { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.css";

type ButtonType =
  | "primaryPurple"
  | "primaryBlue"
  | "dark"
  | "danger"
  | "clean"
  | "link";

type ButtonHTMLType = "button" | "submit" | "reset" | undefined;

interface ButtonProps {
  tabIndex?: number;
  type?: ButtonType;
  to?: string;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  ariaExpanded?: boolean;
  ariaControls?: string;
  htmlType?: ButtonHTMLType;
  block?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
}

function Button({
  tabIndex = 0,
  type = "primaryPurple",
  to,
  children,
  ariaExpanded,
  ariaControls,
  htmlType = "button",
  block = false,
  name,
  value,
  disabled = false,
  onClick,
}: ButtonProps) {
  const content = (
    <button
      type={htmlType}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      tabIndex={tabIndex}
      className={`
      ${styles.button} 
      ${styles[type]} 
      ${disabled ? styles.disabled : ""}
      ${block ? styles.block : ""}
      `}
      name={name}
      value={value}
      disabled={disabled}
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
