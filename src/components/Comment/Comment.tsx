import { Comment } from "src/interfaces/Feedback";
import AvatarTestImage from "@assets/avatar-test.png";
import styles from "./comment.module.css";
import Button from "@components/Button";
import CommentReply from "./CommentReply";

interface CommentProps {
  className?: string;
  comment: Comment;
}

function Comment({ className = "", comment }: CommentProps) {
  const { user, content, replies = [] } = comment;
  return (
    <div className={`${styles.comment} ${className}`}>
      <header>
        <div className={styles.userInfo}>
          <img src={AvatarTestImage} alt={user.name} />
          <div>
            <h5>{user.name}</h5>
            <p>@{user.username}</p>
          </div>
        </div>
        {/* <img src={user.image} /> */}
        <Button type="link">Reply</Button>
      </header>
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
