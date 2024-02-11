import { ReactComponent as NewFeedbackIcon } from "@assets/shared/icon-new-feedback.svg";
import FeedbackForm from "@components/FeedbackForm";
import GoBackLink from "@components/GoBackLink";
import styles from "./feedbackNew.module.css";
import FeedbackFormCard from "@components/FeedbackFormCard";

function FeedbackNewPage() {
  return (
    <div className={styles.feedbackNew}>
      <header>
        <GoBackLink />
      </header>
      <main>
        <FeedbackFormCard
          icon={<NewFeedbackIcon />}
          title="Create New Feedback"
        >
          <FeedbackForm />
        </FeedbackFormCard>
      </main>
    </div>
  );
}

export default FeedbackNewPage;
