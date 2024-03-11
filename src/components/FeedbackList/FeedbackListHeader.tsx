import { useSubmit, useAsyncValue, useSearchParams } from "react-router-dom";
import { CurrentUser, Feedback } from "src/interfaces/Feedback";

import Button from "@components/Button";
import Select from "react-dropdown-select";

import styles from "./feedbackList.module.css";

import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import { ReactComponent as BulbIcon } from "@assets/bulb-icon.svg";

type HomeDataTuple = [Feedback[], CurrentUser];

const sortByOptions = [
  { label: "Most Upvotes", value: "moreVotes" },
  { label: "Least Upvotes", value: "lessVotes" },
  { label: "Most Comments", value: "moreComments" },
  { label: "Least Comments", value: "lessComments" },
];

function FeedbackListHeader({ loading = false }) {
  const submit = useSubmit();
  const [feedbackList] = useAsyncValue() as HomeDataTuple;
  const [searchParams] = useSearchParams();
  const defaultSortingOption =
    sortByOptions.find(
      (option) => option.value === searchParams.get("sortBy")
    ) ?? sortByOptions[0];

  return (
    <header>
      <div>
        <h3 className={styles.suggestionCount}>
          {" "}
          <BulbIcon /> {feedbackList?.length ?? 0} suggestions
        </h3>
        <Select
          className={styles.select}
          searchable={false}
          options={sortByOptions}
          values={[defaultSortingOption]}
          contentRenderer={({ state }) => (
            <div style={{ cursor: "pointer" }}>
              Sort by : <b>{state.values[0].label}</b>
            </div>
          )}
          dropdownHandleRenderer={({ state }) => (
            <span
              className={`${styles.selectHandle} ${
                state.dropdown ? styles.active : ""
              }`}
            >
              <ChevronIcon />
            </span>
          )}
          disabled={loading}
          onChange={(values) => {
            const searchParamsObj = Object.fromEntries(searchParams);
            submit({ ...searchParamsObj, sortBy: values[0].value });
          }}
          required
        />
      </div>
      <Button to="/feedback/new">+ Add Feedback</Button>
    </header>
  );
}

export default FeedbackListHeader;
