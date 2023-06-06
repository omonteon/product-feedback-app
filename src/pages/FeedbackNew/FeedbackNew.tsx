import { Form, Link } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
// import { ReactComponent as ChevronDownIcon } from "@assets/chevron-icon.svg";
import { ReactComponent as PlusIcon } from "@assets/plus-icon.svg";
import Select from "react-dropdown-select";
import Card from "@components/Card";
import Button from "@components/Button";
import styles from "./feedbackNew.module.css";

function FeedbackNewPage() {
  return (
    <div className={styles.feedbackNew}>
      <header>
        <Link to="..">
          <ChevronLeftIcon /> Go Back
        </Link>
      </header>
      <main>
        <span className={styles.formIcon}>
          <PlusIcon />
        </span>
        <Card>
          <h3>Create New Feedback</h3>
          <Form className={styles.form} method="post">
            <div>
              <label htmlFor="title">Feedback title</label>
              <p>Add a short, descriptive line</p>
              <input type="text" name="title" />
            </div>
            <div>
              <label htmlFor="title">Category</label>
              <p>Choose a category for your feedback</p>
              <Select
                className={styles.dropdownButton}
                searchable={false}
                name="category"
                options={[
                  { label: "Feature", value: "feature" },
                  { label: "UI", value: "ui" },
                  { label: "UX", value: "ux" },
                  { label: "Enhancement", value: "enhancement" },
                  { label: "Bug", value: "bug" },
                ]}
                values={[{ label: "Feature", value: "feature" }]}
                onChange={console.log}
              />
            </div>

            <div>
              <label htmlFor="title">Feedback Detail</label>
              <p>
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea rows={4} name="detail"></textarea>
            </div>
            <Button type="primaryPurple" htmlType="submit">
              Add Feedback
            </Button>
            <Button to=".." type="dark">
              Cancel
            </Button>
          </Form>
        </Card>
      </main>
    </div>
  );
}

export default FeedbackNewPage;
