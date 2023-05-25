import { Feedback } from "src/interfaces/Feedback";
import Card from "@components/Card";
import Tag from "@components/Tag";
import VoteButton from "@components/VoteButton";
import CommentCount from "./CommentCount";
import styles from "./feedbackCard.module.css";

interface FeedbackCardProps {
  feedback: Feedback;
  redirectTo?: string;
  onToggleVote: (id: number) => void;
}

// TODO: Style the content
// TODO: Add upvote component and comment component
function FeedbackCard({
  feedback,
  redirectTo,
  onToggleVote,
}: FeedbackCardProps) {
  const {
    id,
    title = "",
    description = "",
    tag = "Enhancement",
    upVoteCount = 0,
    commentCount = 0,
    upVoted = false,
  } = feedback;

  // ??: Where should you put handlers ?
  // ??: Should there be arrow funcs or funcs declarations ?
  // const handleToggleVote = () => {

  // }

  // TODO: Let the card be clickable to take to another route, but
  // at the same time, let clickable child elements be interactive
  // without taking you to another route
  return (
    <Card
      to={redirectTo}
      className={`${styles.feedbackCard} ${styles.linkWrapper}`}
    >
      <h4>{title}</h4>
      <p>{description}</p>
      <Tag className={styles.feedbackCardTag}>{tag}</Tag>
      <footer>
        <VoteButton
          className={`${upVoted ? styles.upVoted : ""}`}
          upVoted={upVoted}
          count={upVoteCount}
          onChange={() => onToggleVote(id)}
        />
        <CommentCount count={commentCount} />
      </footer>
    </Card>
  );
}

export default FeedbackCard;
