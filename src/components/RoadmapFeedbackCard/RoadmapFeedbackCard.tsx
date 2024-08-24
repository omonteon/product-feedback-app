import { Feedback } from "src/interfaces/Feedback";
import Tag from "@components/Tag";
import VoteButton from "@components/VoteButton";
import CommentCount from "@components/FeedbackCard/CommentCount";
import styles from "./roadmapFeedbackCard.module.css";

interface RoadmapFeedbackCardProps {
  feedback: Feedback;
  upVoted?: boolean;
}

function RoadmapFeedbackCard({
  feedback,
  upVoted = false,
}: RoadmapFeedbackCardProps) {
  const {
    id,
    title,
    description,
    category,
    upvotes,
    status,
    commentCount = 0,
  } = feedback;

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.status}>
        <span className={styles.statusDot}></span>
        {status}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Tag className={styles.tag}>{category}</Tag>
      <div className={styles.footer}>
        <VoteButton feedbackId={id} upVoted={upVoted} count={upvotes} />
        <CommentCount count={commentCount} />
      </div>
    </div>
  );
}

export default RoadmapFeedbackCard;
