import { useState } from "react";
import { Link, useLoaderData, Params } from "react-router-dom";
import { getFeedbackById } from "@api/FeedbackAPI";
import { FeedbackDetails } from "src/interfaces/Feedback";
import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
import FeedbackCard from "@components/FeedbackCard";
import styles from "./feedbackDetails.module.css";
import Button from "@components/Button";
import Card from "@components/Card";
import Comment from "@components/Comment";
import AddComment from "@components/AddComment";

interface LoaderFunctionArgs {
  params: Params;
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<FeedbackDetails> {
  const feedback = await getFeedbackById(Number(params.feedbackId));
  if (!feedback) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return feedback;
}

function FeedbackDetailsPage() {
  const _feedback = useLoaderData() as FeedbackDetails;
  const [feedback, setFeedback] = useState<FeedbackDetails | null>(_feedback); // TODO: remove this after implementing an action or using useFetcher

  const handleToggleVote = () => {
    if (feedback === null) {
      throw new Error("Feedback element is undefined");
    }
    setFeedback({
      ...feedback,
      upVoteCount: feedback.upVoted
        ? feedback.upVoteCount - 1
        : feedback.upVoteCount + 1,
      upVoted: !feedback.upVoted,
    });
    // TODO: Update in API or localstorage
  };

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
          <FeedbackCard feedback={feedback} onToggleVote={handleToggleVote} />

          {feedback?.comments && feedback.commentCount > 0 ? (
            <Card className={styles.comments}>
              <h3>{feedback.commentCount} Comments</h3>
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
