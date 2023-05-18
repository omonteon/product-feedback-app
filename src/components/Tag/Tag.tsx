import { ReactNode } from "react";
import styles from "./tag.module.css";

interface TagProps {
  children?: ReactNode;
}

function Tag({ children }: TagProps) {
  return <button className={styles.tag}>{children}</button>;
}

export default Tag;
