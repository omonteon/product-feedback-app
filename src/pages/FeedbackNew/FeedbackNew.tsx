import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
import { ReactComponent as PlusIcon } from "@assets/plus-icon.svg";
import Card from "@components/Card";
import styles from "./feedbackNew.module.css";
import FeedbackForm from "@components/FeedbackForm";

function FeedbackNewPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.feedbackNew}>
      <header>
        <Link to=".." onClick={() => navigate(-1)}>
          <ChevronLeftIcon /> Go Back
        </Link>
      </header>
      <main>
        <span className={styles.plusIcon}>
          <PlusIcon />
        </span>
        <Card>
          <h3>Create New Feedback</h3>
          <FeedbackForm />
        </Card>
      </main>
    </div>
  );
}

export default FeedbackNewPage;
