import { ReactNode } from "react";
import styles from "./badge.module.css";

interface BadgeProps {
  color: string;
  text: string | ReactNode;
  className?: string;
}

function Badge({ color, text, className = "" }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${className}`}>
      <span className={styles.dot} style={{ backgroundColor: color }}></span>
      <span>{text}</span>
    </span>
  );
}

export default Badge;
