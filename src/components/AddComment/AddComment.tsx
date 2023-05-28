import Card from "@components/Card";
import styles from "./addComment.module.css";
import Button from "@components/Button";
import { ChangeEvent, useState } from "react";

interface AddCommentProps {
  className?: string;
}

const MAX_CHARS = 250;

// TODO:
// 1. Wire form to add comments to the API
// 2. Add form validation
// 3. Add form interaction

function AddComment({ className = "" }: AddCommentProps) {
  const [charsLeft, setCharsLeft] = useState(MAX_CHARS);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textLength = event.target.value.length;
    setCharsLeft(MAX_CHARS - textLength);
  };

  return (
    <Card className={`${styles.container} ${className || ""}`}>
      <h3>Add Comment</h3>

      <form className={styles.form}>
        <textarea
          placeholder="Type your comment here"
          onChange={handleTextAreaChange}
        ></textarea>
        <footer>
          <p>{charsLeft <= 0 ? 0 : charsLeft} characters left</p>
          <Button
            htmlType="submit"
            type="primaryPurple"
            disabled={charsLeft < 0}
          >
            Post Comment
          </Button>
        </footer>
      </form>
    </Card>
  );
}

export default AddComment;
