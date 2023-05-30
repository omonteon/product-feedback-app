import { useState } from "react";
import { Link, useLoaderData, Params } from "react-router-dom";
import { getFeedbackById, updateFeedbackById } from "@api/FeedbackAPI";
import { Feedback, FeedbackDetails } from "src/interfaces/Feedback";
import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
import FeedbackCard from "@components/FeedbackCard";
import styles from "./feedbackDetails.module.css";
import Button from "@components/Button";
import Card from "@components/Card";
import Comment from "@components/Comment";
import AddComment from "@components/AddComment";

function FeedbackDetailsPage() {
  const feedback = useLoaderData() as FeedbackDetails;

  return (
    <main className={styles.feedbackDetails}>
      <header>
        <Link to="..">
          <ChevronLeftIcon /> Go Back
        </Link>

        <Button type="primaryBlue" to="edit">
          Edit Feedback
        </Button>
      </header>
      {feedback === null ? (
        <>Issue retrieving details</>
      ) : (
        <div className={styles.content}>
          <FeedbackCard feedback={feedback} />

          {feedback?.comments && feedback.comments.length > 0 ? (
            <Card className={styles.comments}>
              <h3>{feedback.comments.length} Comments</h3>
              {feedback.comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    className={styles.comment}
                  />
                );
              })}
            </Card>
          ) : null}
        </div>
      )}
      <AddComment className={styles.addComment} />
    </main>
  );
}

export default FeedbackDetailsPage;
