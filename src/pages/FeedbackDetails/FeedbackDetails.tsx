import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFeedbackById } from "@api/FeedbackAPI";
import { Feedback } from "src/interfaces/Feedback";
import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
import FeedbackCard from "@components/FeedbackCard";
import styles from "./feedbackDetails.module.css";
import Button from "@components/Button";

// TODO: Use a react router loader

function FeedbackDetailsPage() {
  const { feedbackId } = useParams();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    const feedbackResponse = getFeedbackById(Number(feedbackId));
    setFeedback(feedbackResponse);
  }, []);

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

        <Button type="primaryBlue">Edit Feedback</Button>
      </header>
      {feedback === null ? (
        <>Issue retrieving details</>
      ) : (
        <FeedbackCard feedback={feedback} onToggleVote={handleToggleVote} />
      )}
    </main>
  );
}

export default FeedbackDetailsPage;
