import { User } from "src/interfaces/Feedback";
import Button from "@components/Button";
import AvatarTestImage from "@assets/avatar-test.png";
import styles from "./comment.module.css";

interface CommentHeaderProps {
  user: User;
}

function CommentHeader({ user }: CommentHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <img src={AvatarTestImage} alt={user.name} />
        <div>
          <h5>{user.name}</h5>
          <p>@{user.username}</p>
        </div>
      </div>
      <Button type="link">Reply</Button>
    </header>
  );
}

export default CommentHeader;
