import { ReactNode } from "react";
import styles from "./tag.module.css";

interface CheckableTagProps {
  checked?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function CheckableTag({
  checked = false,
  disabled = false,
  children,
  onClick,
}: CheckableTagProps) {
  return (
    <button
      className={`${styles.tag} ${checked ? styles.checked : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default CheckableTag;
