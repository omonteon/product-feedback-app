import { useState } from "react";
import { Comment } from "src/interfaces/Feedback";
import CommentReply from "./CommentReply";
import CommentHeader from "./CommentHeader";
import AddComment from "@components/AddComment";
import styles from "./comment.module.css";

interface CommentProps {
  comment: Comment;
  feedbackId: string;
  className?: string;
}

function Comment({ comment, feedbackId, className = "" }: CommentProps) {
  const { user, content, replies = [] } = comment;
  const [replyFormVisible, setReplyFormVisible] = useState(false);

  function handleClickReply() {
    setReplyFormVisible(!replyFormVisible);
  }

  return (
    <div className={`${styles.comment} ${className}`}>
      <CommentHeader user={user} onClickReply={handleClickReply} />
      <p>{content}</p>
      {replyFormVisible ? (
        <div className={styles.replyForm}>
          <AddComment feedbackId={feedbackId} commentId={comment.id} />
        </div>
      ) : null}
      {replies.length > 0 ? (
        <div className={styles.replies}>
          {replies.map((reply) => {
            return (
              <CommentReply
                key={reply.replyingTo}
                reply={reply}
                feedbackId={feedbackId}
                commentId={comment.id}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
