import { Comment } from "src/interfaces/Feedback";
import CommentReply from "./CommentReply";
import CommentHeader from "./CommentHeader";
import styles from "./comment.module.css";

interface CommentProps {
  className?: string;
  comment: Comment;
}

function Comment({ className = "", comment }: CommentProps) {
  const { user, content, replies = [] } = comment;
  return (
    <div className={`${styles.comment} ${className}`}>
      <CommentHeader user={user} />
      <p>{content}</p>
      {replies.length > 0 ? (
        <div className={styles.replies}>
          {replies.map((reply) => {
            // TODO: Replies are missing an id
            return <CommentReply key={reply.replyingTo} reply={reply} />;
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
