import { ReactNode } from "react";
import styles from "./tag.module.css";
import CheckableTag from "./CheckableTag";

interface TagProps {
  children?: ReactNode;
}

function Tag({ children }: TagProps) {
  return <button className={styles.tag}>{children}</button>;
}

Tag.CheckableTag = CheckableTag;

export default Tag;
