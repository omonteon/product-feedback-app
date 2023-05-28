import { CommentReply } from "src/interfaces/Feedback";
import styles from "./comment.module.css";
import CommentHeader from "./CommentHeader";

interface CommentReplyProps {
  className?: string;
  reply: CommentReply;
}

function CommentReply({ className = "", reply }: CommentReplyProps) {
  const { user, content, replyingTo } = reply;

  return (
    <div className={`${styles.reply} ${className}`}>
      <CommentHeader user={user} />
      <p className={styles.content}>
        <b>@{replyingTo}</b> {content}
      </p>
    </div>
  );
}

export default CommentReply;
