import { ReactNode } from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

interface CardProps {
  className?: string;
  to?: string;
  children?: ReactNode;
}

function Card({ className, to, children }: CardProps) {
  const content = (
    <div className={`${styles.card} ${className}`}>{children}</div>
  );

  return to ? (
    <Link to={to} className={styles.linkWrapper}>
      {content}
    </Link>
  ) : (
    content
  );
}

export default Card;
