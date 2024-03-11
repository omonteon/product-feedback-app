import { useAsyncValue } from "react-router-dom";

import EmptyFeedback from "@components/EmptyFeedback";
import FeedbackCard from "@components/FeedbackCard";
import FeedbackListHeader from "./FeedbackListHeader";

import { CurrentUser, Feedback, Vote } from "src/interfaces/Feedback";

import styles from "./feedbackList.module.css";

type HomeDataTuple = [Feedback[], CurrentUser];

function FeedbackList({ loading = false }) {
  const [feedbackList, currentUser] = useAsyncValue() as HomeDataTuple;

  return (
    <>
      <FeedbackListHeader loading={loading} />
      <section className={styles.mainContent}>
        {feedbackList?.length === 0 ? (
          <EmptyFeedback />
        ) : (
          feedbackList.map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              redirectTo={`feedback/${feedback.id}`}
              upVoted={isFeedbackUpVoted(currentUser.votes ?? [], feedback.id)}
            />
          ))
        )}
      </section>
    </>
  );
}

function isFeedbackUpVoted(userVotes: Vote[], feedbackId: string): boolean {
  return userVotes.some((vote) => vote.productRequestId === feedbackId);
}

export default FeedbackList;
