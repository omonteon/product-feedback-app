import { Link, useLoaderData } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
import { ReactComponent as PlusIcon } from "@assets/plus-icon.svg";
import Card from "@components/Card";
import styles from "./feedbackEdit.module.css";
import FeedbackForm from "@components/FeedbackForm";
import { Feedback } from "src/interfaces/Feedback";

function FeedbackEditPage() {
  const { feedback } = useLoaderData() as { feedback: Feedback };

  return (
    <div className={styles.container}>
      <header>
        <Link to="..">
          <ChevronLeftIcon /> Go Back
        </Link>
      </header>
      <main>
        <span className={styles.plusIcon}>
          <PlusIcon />
        </span>
        <Card>
          <h3>Editing {feedback.title}</h3>
          <FeedbackForm defaultFeedback={feedback} editing={true} />
        </Card>
      </main>
    </div>
  );
}

export default FeedbackEditPage;
