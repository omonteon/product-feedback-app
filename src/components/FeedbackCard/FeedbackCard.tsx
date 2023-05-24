import Card from "@components/Card";
import Tag from "@components/Tag";
import { Feedback } from "src/interfaces/Feedback";
import styles from "./feedbackCard.module.css";
import VoteButton from "@components/VoteButton";

interface FeedbackCardProps {
  feedback: Feedback;
  toggleVote: (id: number) => void;
}

// TODO: Style the content
// TODO: Add upvote component and comment component
function FeedbackCard({ feedback, toggleVote }: FeedbackCardProps) {
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

  return (
    <Card className={styles.feedbackCard}>
      <h4>{title}</h4>
      <p>{description}</p>
      <Tag className={styles.feedbackCardTag}>{tag}</Tag>
      <footer>
        <VoteButton
          className={`${upVoted ? styles.upVoted : ""}`}
          upVoted={upVoted}
          count={upVoteCount}
          onChange={() => toggleVote(id)}
        />
      </footer>
    </Card>
  );
}

export default FeedbackCard;
