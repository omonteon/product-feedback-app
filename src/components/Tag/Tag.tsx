import { ReactNode } from "react";
import styles from "./tag.module.css";
import CheckableTag from "./CheckableTag";

interface TagProps {
  children?: ReactNode;
  className?: string;
}

function Tag({ children, className = "" }: TagProps) {
  return <button className={`${styles.tag} ${className}`}>{children}</button>;
}

Tag.CheckableTag = CheckableTag;

export default Tag;
