import { ReactComponent as CommentBubbleIcon } from "@assets/comment-bubble-icon.svg";
import styles from "./feedbackCard.module.css";

function CommentCount({ count = 0 }: { count: number }) {
  return (
    <div className={styles.commentBubble}>
      <CommentBubbleIcon /> {count}
    </div>
  );
}

export default CommentCount;
