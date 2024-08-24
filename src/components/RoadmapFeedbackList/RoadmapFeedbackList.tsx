import FeedbackCard from "@components/FeedbackCard";
import { CurrentUser, Feedback, Vote } from "src/interfaces/Feedback";
import styles from "./roadmapFeedbackList.module.css";

interface RoadmapFeedbackListProps {
  feedbackList: Feedback[];
  currentUser: CurrentUser;
}

function RoadmapFeedbackList({
  feedbackList,
  currentUser,
}: RoadmapFeedbackListProps) {
  return (
    <section className={styles.mainContent}>
      {feedbackList.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          feedback={feedback}
          redirectTo={`feedback/${feedback.id}`}
          upVoted={isFeedbackUpVoted(currentUser.votes ?? [], feedback.id)}
        />
      ))}
    </section>
  );
}

function isFeedbackUpVoted(userVotes: Vote[], feedbackId: string): boolean {
  return userVotes.some((vote) => vote.productRequestId === feedbackId);
}

export default RoadmapFeedbackList;
