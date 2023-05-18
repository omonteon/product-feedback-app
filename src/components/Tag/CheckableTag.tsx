import { ReactNode } from "react";
import styles from "./tag.module.css";

interface CheckableTagProps {
  checked?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

function CheckableTag({
  checked = false,
  children,
  onClick,
}: CheckableTagProps) {
  return (
    <button
      className={`${styles.tag} ${checked ? styles.checked : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default CheckableTag;
