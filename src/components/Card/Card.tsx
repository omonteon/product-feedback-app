import { ReactNode } from "react";
import styles from "./card.module.css";

interface CardProps {
  children?: ReactNode;
}

function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}

export default Card;
