import Card from "@components/Card";
import EmptyFeedbackGraphic from "@assets/empty-feedback-graphic.png";
import Button from "@components/Button";
import styles from "./emptyFeedback.module.css";

function EmptyFeedback() {
  return (
    <Card className={styles.cardContainer}>
      <img src={EmptyFeedbackGraphic} alt="Empty feedback list" />
      <h3>There is no feedback yet.</h3>
      <p>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Button type="primaryPurple" to="/feedback/new">
        + Add Feedback
      </Button>
    </Card>
  );
}

export default EmptyFeedback;
