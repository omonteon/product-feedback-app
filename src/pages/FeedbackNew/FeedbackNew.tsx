import { Form, Link } from "react-router-dom";
import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
import { ReactComponent as PlusIcon } from "@assets/plus-icon.svg";
import Select from "react-dropdown-select";
import Card from "@components/Card";
import Button from "@components/Button";
import styles from "./feedbackNew.module.css";
import { useState } from "react";

const categories = [
  { label: "Feature", value: "feature" },
  { label: "UI", value: "ui" },
  { label: "UX", value: "ux" },
  { label: "Enhancement", value: "enhancement" },
  { label: "Bug", value: "bug" },
];

function FeedbackNewPage() {
  const [category, setCategory] = useState(categories[0].value);
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleSubmitForm() {
    setFormSubmitted(true);
  }

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
          <Form
            className={`${styles.form} ${
              formSubmitted ? styles.formSubmitted : ""
            }`}
            method="post"
          >
            <div className={styles.formElement}>
              <label htmlFor="title">Feedback title</label>
              <p>Add a short, descriptive line</p>
              <input type="text" name="title" required />
              <span className={styles.errorMsg}>Can&apos;t be empty</span>
            </div>
            <div className={styles.formElement}>
              <label htmlFor="title">Category</label>
              <p>Choose a category for your feedback</p>
              <Select
                className={styles.dropdownButton}
                searchable={false}
                options={categories}
                values={[categories[0]]}
                onChange={(values) => {
                  setCategory(values[0].value);
                }}
                required
              />
              <input type="hidden" name="category" value={category} />
            </div>

            <div className={styles.formElement}>
              <label htmlFor="title">Feedback Detail</label>
              <p>
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <textarea rows={4} name="description" required></textarea>
              <span className={styles.errorMsg}>Can&apos;t be empty</span>
            </div>
            <Button
              type="primaryPurple"
              htmlType="submit"
              onClick={handleSubmitForm}
            >
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
