import { ReactNode, ReactElement } from "react";
import Card from "@components/Card";
import styles from "./feedbackFormCard.module.css";

interface FeedbackFormCardProps {
  icon: ReactElement;
  title: string;
  children?: ReactNode;
}

function FeedbackFormCard({ children, icon, title }: FeedbackFormCardProps) {
  return (
    <Card className={styles.feedbackFormCard}>
      <span className={styles.icon}>{icon}</span>
      <h3>{title}</h3>
      {children}
    </Card>
  );
}

export default FeedbackFormCard;
