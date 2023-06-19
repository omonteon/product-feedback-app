import { useState } from "react";
import { CommentReply } from "src/interfaces/Feedback";
import CommentHeader from "./CommentHeader";
import AddComment from "@components/AddComment";
import styles from "./comment.module.css";

interface CommentReplyProps {
  className?: string;
  reply: CommentReply;
  feedbackId: string;
  commentId: string;
}

function CommentReply({
  className = "",
  reply,
  feedbackId,
  commentId,
}: CommentReplyProps) {
  const { user, content, replyingTo } = reply;
  const [replyFormVisible, setReplyFormVisible] = useState(false);

  function handleClickReply() {
    setReplyFormVisible(!replyFormVisible);
  }

  return (
    <div className={`${className || ""}`}>
      <CommentHeader user={user} onClickReply={handleClickReply} />
      <p className={styles.content}>
        <b>@{replyingTo}</b> {content}
      </p>
      {replyFormVisible ? (
        <div className={styles.replyForm}>
          <AddComment feedbackId={feedbackId} commentId={commentId} />
        </div>
      ) : null}
    </div>
  );
}

export default CommentReply;
