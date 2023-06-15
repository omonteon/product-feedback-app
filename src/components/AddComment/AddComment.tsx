import Card from "@components/Card";
import styles from "./addComment.module.css";
import Button from "@components/Button";
import { ChangeEvent, useState } from "react";
import { Form, useFetcher } from "react-router-dom";

interface AddCommentProps {
  feedbackId: string;
  className?: string;
}

const MAX_CHARS = 250;

// TODO:
// 1. Wire form to add comments to the API
// 2. Add form validation
// 3. Add form interaction

function AddComment({ feedbackId, className = "" }: AddCommentProps) {
  const [comment, setComment] = useState("");
  const [charsLeft, setCharsLeft] = useState(MAX_CHARS);
  const fetcher = useFetcher();

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textLength = event.target.value.length;
    if (MAX_CHARS - textLength >= 0) {
      setComment(event.target.value);
    }
    setCharsLeft(MAX_CHARS - textLength);
  };

  return (
    <Card className={`${styles.container} ${className || ""}`}>
      <h3>Add Comment</h3>

      <Form className={styles.form}>
        <textarea
          placeholder="Type your comment here"
          onChange={handleTextAreaChange}
          value={comment}
        ></textarea>
        <footer>
          <p>{charsLeft <= 0 ? 0 : charsLeft} characters left</p>
          <Button
            htmlType="submit"
            type="primaryPurple"
            onClick={() => {
              fetcher.submit(
                {
                  comment: comment.toString(),
                  feedbackId: feedbackId.toString(),
                  intent: "addComment",
                },
                { method: "put" }
              );
            }}
          >
            Post Comment
          </Button>
        </footer>
      </Form>
    </Card>
  );
}

export default AddComment;
