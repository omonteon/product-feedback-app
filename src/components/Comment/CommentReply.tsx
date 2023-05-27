import { CommentReply } from "src/interfaces/Feedback";
import Button from "@components/Button";
import AvatarTestImage from "@assets/avatar-test.png";
import styles from "./comment.module.css";

interface CommentReplyProps {
  className?: string;
  reply: CommentReply;
}

function CommentReply({ className = "", reply }: CommentReplyProps) {
  const { user, content, replyingTo } = reply;

  return (
    <div className={`${styles.reply} ${className}`}>
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
      <p className={styles.content}>
        <b>@{replyingTo}</b> {content}
      </p>
    </div>
  );
}

export default CommentReply;
