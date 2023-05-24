import { ReactNode } from "react";
import CheckableTag from "./CheckableTag";
import styles from "./tag.module.css";

interface TagProps {
  children?: ReactNode;
  className?: string;
}

function Tag({ children, className = "" }: TagProps) {
  return <div className={`${styles.tag} ${className}`}>{children}</div>;
}

Tag.CheckableTag = CheckableTag;

export default Tag;
