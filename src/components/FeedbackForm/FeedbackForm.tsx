import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import { Feedback, FeedbackStatus, FeedbackTag } from "src/interfaces/Feedback";
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

const statusList = [
  { label: "Suggestion", value: "suggestion" },
  { label: "Planned", value: "planned" },
  { label: "In-Progress", value: "in-progress" },
  { label: "Live", value: "live" },
];

interface FeedbackFormProps {
  defaultFeedback?: Feedback;
  editing?: boolean;
}

function FeedbackForm({ defaultFeedback, editing = false }: FeedbackFormProps) {
  const submittingForm = useNavigation().state === "submitting";
  const defaultCategory = defaultFeedback?.category ?? "Feature";
  const defaultCategoryValue = categories.find(
    (c) => c.value === defaultCategory
  );
  const defaultStatus = defaultFeedback?.status ?? "suggestion";
  const defaultStatusValue = statusList.find((c) => c.value === defaultStatus);
  const [category, setCategory] = useState<FeedbackTag>(defaultCategory);
  const [status, setStatus] = useState<FeedbackStatus>(defaultStatus);
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
        <input
          type="text"
          name="title"
          disabled={submittingForm}
          defaultValue={defaultFeedback?.title}
          required
        />
        <span className={styles.errorMsg}>Can&apos;t be empty</span>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="title">Category</label>
        <p>Choose a category for your feedback</p>
        <Select
          className={styles.select}
          dropdownGap={-60}
          searchable={false}
          options={categories}
          values={
            defaultCategoryValue ? [defaultCategoryValue] : [categories[0]]
          }
          disabled={submittingForm}
          onChange={(values) => {
            setCategory(values[0].value as FeedbackTag);
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

      {editing ? (
        <div className={styles.formElement}>
          <label htmlFor="title">Update Status</label>
          <p>Change feature state</p>
          <Select
            className={styles.select}
            searchable={false}
            options={statusList}
            values={defaultStatusValue ? [defaultStatusValue] : [statusList[0]]}
            disabled={submittingForm}
            onChange={(values) => {
              setStatus(values[0].value as FeedbackStatus);
            }}
            required
          />
          <input
            type="hidden"
            name="status"
            disabled={submittingForm}
            value={status}
          />
        </div>
      ) : null}

      <div className={styles.formElement}>
        <label htmlFor="title">Feedback Detail</label>
        <p>
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          rows={4}
          name="description"
          defaultValue={defaultFeedback?.description}
          required
        ></textarea>
        <span className={styles.errorMsg}>Can&apos;t be empty</span>
      </div>
      {editing ? (
        <Button
          type="primaryPurple"
          htmlType="submit"
          name="intent"
          value="update"
          disabled={submittingForm}
          onClick={handleSubmitForm}
          block
        >
          {submittingForm ? "Saving changes" : "Save Changes"}
        </Button>
      ) : (
        <Button
          type="primaryPurple"
          htmlType="submit"
          name="intent"
          value="add"
          disabled={submittingForm}
          onClick={handleSubmitForm}
          block
        >
          {submittingForm ? "Adding feedback..." : "Add Feedback"}
        </Button>
      )}
      <Button to=".." type="dark" disabled={submittingForm} block>
        Cancel
      </Button>
      {editing ? (
        <Button
          type="danger"
          htmlType="submit"
          name="intent"
          value="delete"
          block
        >
          Delete
        </Button>
      ) : null}
    </Form>
  );
}

export default FeedbackForm;
