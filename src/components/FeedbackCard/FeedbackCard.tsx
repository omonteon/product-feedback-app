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

function FeedbackCard({
  feedback,
  redirectTo,
  upVoted = false,
}: FeedbackCardProps) {
  const {
    id,
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
      <div>
        <aside>
          <VoteButton feedbackId={id} upVoted={upVoted} count={upvotes} />
        </aside>
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
          <Tag className={styles.feedbackCardTag}>{category}</Tag>
          <footer>
            <VoteButton feedbackId={id} upVoted={upVoted} count={upvotes} />
            <CommentCount count={commentCount} />
          </footer>
        </div>
      </div>
      <aside>
        <CommentCount count={commentCount} />
      </aside>
    </Card>
  );
}

export default FeedbackCard;
