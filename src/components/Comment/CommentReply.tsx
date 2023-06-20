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

  function toggleReply() {
    setReplyFormVisible(!replyFormVisible);
  }

  return (
    <div className={`${className || ""}`}>
      <CommentHeader user={user} onClickReply={toggleReply} />
      <p className={styles.content}>
        <b>@{replyingTo}</b> {content}
      </p>
      <div
        className={styles.replyForm}
        style={{ display: replyFormVisible ? "block" : "none" }}
      >
        <AddComment
          feedbackId={feedbackId}
          commentId={commentId}
          onCommentSubmitted={() => setReplyFormVisible(false)}
        />
      </div>
    </div>
  );
}

export default CommentReply;
