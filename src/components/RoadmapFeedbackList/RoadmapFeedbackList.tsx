import { CurrentUser, Feedback, Vote } from "src/interfaces/Feedback";
import RoadmapFeedbackCard from "@components/RoadmapFeedbackCard";
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
        <RoadmapFeedbackCard
          key={feedback.id}
          feedback={feedback}
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
