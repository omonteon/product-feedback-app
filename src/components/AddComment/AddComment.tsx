import { ChangeEvent, useEffect, useState } from "react";
import { Form, useFetcher } from "react-router-dom";
import Button from "@components/Button";
import styles from "./addComment.module.css";

interface AddCommentProps {
  feedbackId: string;
  commentId?: string;
}

const MAX_CHARS = 250;

function AddComment({ feedbackId, commentId }: AddCommentProps) {
  const [comment, setComment] = useState("");
  const [charsLeft, setCharsLeft] = useState(MAX_CHARS);
  const fetcher = useFetcher();
  const submitting = fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.state === "loading") {
      setComment("");
      setCharsLeft(MAX_CHARS);
    }
  }, [fetcher.state]);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textLength = event.target.value.length;
    if (MAX_CHARS - textLength >= 0) {
      setComment(event.target.value);
    }
    setCharsLeft(MAX_CHARS - textLength);
  };

  return (
    <Form className={`${styles.form} ${submitting ? styles.submitting : ""}`}>
      <textarea
        disabled={submitting}
        placeholder="Type your comment here"
        onChange={handleTextAreaChange}
        value={comment}
      ></textarea>
      <footer>
        <p>{charsLeft <= 0 ? 0 : charsLeft} characters left</p>
        <Button
          htmlType="submit"
          type="primaryPurple"
          disabled={comment.length === 0 || submitting}
          onClick={() => {
            if (commentId) {
              fetcher.submit(
                {
                  comment: comment.toString(),
                  feedbackId: feedbackId.toString(),
                  commentId,
                  intent: "replyComment",
                },
                { method: "put" }
              );
            } else {
              fetcher.submit(
                {
                  comment: comment.toString(),
                  feedbackId: feedbackId.toString(),
                  intent: "addComment",
                },
                { method: "put" }
              );
            }
          }}
        >
          {submitting ? "Posting Comment..." : "Post Comment"}
        </Button>
      </footer>
    </Form>
  );
}

export default AddComment;
