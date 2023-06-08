import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import Select from "react-dropdown-select";
import Button from "@components/Button";
import styles from "./feedbackForm.module.css";

const categories = [
  { label: "Feature", value: "feature" },
  { label: "UI", value: "ui" },
  { label: "UX", value: "ux" },
  { label: "Enhancement", value: "enhancement" },
  { label: "Bug", value: "bug" },
];

function FeedbackForm() {
  const submittingForm = useNavigation().state === "submitting";
  const [category, setCategory] = useState(categories[0].value);
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleSubmitForm() {
    setFormSubmitted(true);
  }

  return (
    <Form
      className={`
  ${styles.form} 
  ${formSubmitted ? styles.formSubmitted : ""} 
  ${submittingForm ? styles.submitting : " "}
  `}
      method="post"
    >
      <div className={styles.formElement}>
        <label htmlFor="title">Feedback title</label>
        <p>Add a short, descriptive line</p>
        <input type="text" name="title" disabled={submittingForm} required />
        <span className={styles.errorMsg}>Can&apos;t be empty</span>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="title">Category</label>
        <p>Choose a category for your feedback</p>
        <Select
          className={styles.select}
          searchable={false}
          options={categories}
          values={[categories[0]]}
          disabled={submittingForm}
          onChange={(values) => {
            setCategory(values[0].value);
          }}
          required
        />
        <input
          type="hidden"
          name="category"
          disabled={submittingForm}
          value={category}
        />
      </div>

      <div className={styles.formElement}>
        <label htmlFor="title">Feedback Detail</label>
        <p>
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea rows={4} name="description" required></textarea>
        <span className={styles.errorMsg}>Can&apos;t be empty</span>
      </div>
      <Button
        type="primaryPurple"
        htmlType="submit"
        disabled={submittingForm}
        onClick={handleSubmitForm}
      >
        {submittingForm ? "Adding feedback..." : "Add Feedback"}
      </Button>
      <Button to=".." type="dark" disabled={submittingForm}>
        Cancel
      </Button>
    </Form>
  );
}

export default FeedbackForm;
