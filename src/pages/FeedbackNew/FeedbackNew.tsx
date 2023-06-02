import { Form, Link } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
import styles from "./feedbackNew.module.css";
import Card from "@components/Card";
import Button from "@components/Button";

function FeedbackNewPage() {
  return (
    <div className={styles.feedbackNew}>
      <header>
        <Link to="..">
          <ChevronLeftIcon /> Go Back
        </Link>
      </header>
      <main>
        <Card>
          <h3>Create New Feedback</h3>
          <Form>
            <input type="text" />
            <select>
              <option value="ui">UI</option>
              <option value="ux">UX</option>
              <option value="enhancement">Enhancement</option>
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
            </select>

            <textarea></textarea>

            <Button type="primaryPurple" htmlType="submit">
              Add Feedback
            </Button>
            <Button type="dark">Cancel</Button>
          </Form>
        </Card>
      </main>
    </div>
  );
}

export default FeedbackNewPage;
