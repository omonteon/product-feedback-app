import { Feedback } from "src/interfaces/Feedback";
import Card from "@components/Card";
import Tag from "@components/Tag";
import VoteButton from "@components/VoteButton";
import CommentCount from "./CommentCount";
import styles from "./feedbackCard.module.css";

interface FeedbackCardProps {
  feedback: Feedback;
  redirectTo?: string;
  upVoted?: boolean;
}

// TODO: Style the content
// TODO: Add upvote component and comment component
function FeedbackCard({
  feedback,
  redirectTo,
  upVoted = false,
}: FeedbackCardProps) {
  const {
    title = "",
    description = "",
    category = "Enhancement",
    upvotes = 0,
    commentCount = 0,
  } = feedback;

  return (
    <Card
      to={redirectTo}
      className={`${styles.feedbackCard} ${styles.linkWrapper}`}
    >
      <h4>{title}</h4>
      <p>{description}</p>
      <Tag className={styles.feedbackCardTag}>{category}</Tag>
      <footer>
        <VoteButton
          className={`${upVoted ? styles.upVoted : ""}`}
          upVoted={upVoted}
          count={upvotes}
        />
        <CommentCount count={commentCount} />
      </footer>
    </Card>
  );
}

export default FeedbackCard;
