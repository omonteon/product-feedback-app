import { Suspense, useState } from "react";
import {
  Await,
  useAsyncValue,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { CurrentUser, Feedback, Vote } from "src/interfaces/Feedback";
import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import Select from "react-dropdown-select";
import Button from "@components/Button";
import Sidebar from "@components/Sidebar";
import EmptyFeedback from "@components/EmptyFeedback";
import FeedbackCard from "@components/FeedbackCard";
import Skeleton from "@components/Skeleton";
import Card from "@components/Card";
import styles from "./home.module.css";
import TagsCard from "@components/TagsCard";
import RoadmapSummaryCard from "@components/RoadmapSummaryCard";

// Next tasks
// 0. Add "status" field when editing feedback. Filter suggestions in home to show only "suggestions" (4 pomodoros) [DONE in ~1 pomodoro]
// 1. Implement filtering by tag (3 pomodoros) [Done in ~3 pomodoros]
// 2. Show correct number of feedback by category in the sidebar (2 pomodoros) [DONE in 1 pomodoro]
// 3. Implement comment creation and replies too (4 pomodoros) [Done 6 pomodoros]
// 4. Implement sorting dropdown (2 pomodoros) [Done 2 pomodoros]
// 5. Implement sorting logic in the "API" (2 pomodoros) [Done 2 pomodoros]
// 6. Create RoadmapCard component (1 pomodoro)
// 7. Create Column component (1 pomodoro)
// 8. Create Tabs component (3 pomodoros)
// 9. Create Roadmap page component (header + main) (3 pomodoros)
// 10. Prepare to support DnD (1 pomodoro)
// 11. Styles for tablet version (4 pomodoros)
// 12. Create Non-existent components for smartphone (2 pomodoros)
// 13. Styles for desktop version (4 pomodoros)
// 14. Write tests (8 pomodoros)

// Next "Go to poland" tasks
// @. Test accessibillity
// a. Define naming convention for event handler props and event handler functions.
// b. Read and define convention on how to use size units in the project (CSS).
// c. How to type rr6 loaders ? https://github.com/remix-run/react-router/discussions/9792
// d. Improve how data is fetch and shared in the app (Sockets, Context API or Redux)
// e. Maybe change everything to be called ProductRequest instead of Feedback ?
// f. Document the order in which imports should be done
// g. Add "Page" suffix at the end of page components
// h. Improve how icons are imported
// i. Create custom hooks
// j. Make a schema for the forms (https://www.taniarascia.com/schema-based-form-system/)

type HomeDataTuple = [Feedback[], CurrentUser];
type HomeData = {
  data: HomeDataTuple;
};

const sortByOptions = [
  { label: "Most Upvotes", value: "moreVotes" },
  { label: "Least Upvotes", value: "lessVotes" },
  { label: "Most Comments", value: "moreComments" },
  { label: "Least Comments", value: "lessComments" },
];

function HomePage() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const { data } = useLoaderData() as HomeData;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const defaultSortingOption =
    sortByOptions.find(
      (option) => option.value === searchParams.get("sortBy")
    ) ?? sortByOptions[0];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Suspense
        fallback={
          <div>
            <header className={styles.header}>
              <div>
                <h1>Frontend Mentor</h1>
                <h2>Feedback board</h2>
              </div>
              <TagsCard defaultTag={"All"} />
              <RoadmapSummaryCard feedbackList={[]} />
            </header>
            <main className={styles.main}>
              <header>
                <p>
                  Sort by :{" "}
                  <b>
                    {defaultSortingOption.label} <ChevronIcon />{" "}
                  </b>
                </p>
                <Button to="/feedback/new" disabled={true}>
                  + Add Feedback
                </Button>
              </header>
              <section className={styles.mainContent}>
                <Card>
                  <Skeleton />
                </Card>
              </section>
            </main>
          </div>
        }
      >
        <Await resolve={data} errorElement={<p>Error loading home data</p>}>
          <div
            className={
              navigation.state === "loading" ? styles.loading : undefined
            }
          >
            <header className={styles.header}>
              <nav className={styles.nav}>
                <div>
                  <h1>Frontend Mentor</h1>
                  <h2>Feedback board</h2>
                </div>
                {/* TODO: Fix keyboard navigation which enters the sidebar when is hidden */}
                <Sidebar open={sidebarOpen} toggle={toggleSidebar} />
              </nav>
              <div className={styles.headerCards}>
                <Card className={styles.title}>
                  <div>
                    <h1>Frontend Mentor</h1>
                    <h2>Feedback board</h2>
                  </div>
                </Card>
                <TagsCard defaultTag={"All"} />
                <RoadmapSummaryCard feedbackList={[]} />
              </div>
            </header>
            <main className={styles.main}>
              <header>
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
                  disabled={navigation.state === "loading"}
                  onChange={(values) => {
                    submit({ sortBy: values[0].value });
                  }}
                  required
                />
                <Button to="/feedback/new">+ Add Feedback</Button>
              </header>
              <FeedbackList />
            </main>
          </div>
        </Await>
      </Suspense>
    </>
  );
}

function FeedbackList() {
  const [feedbackList, currentUser] = useAsyncValue() as HomeDataTuple;

  return (
    <section className={styles.mainContent}>
      {feedbackList?.length === 0 ? (
        <EmptyFeedback />
      ) : (
        feedbackList
          .filter((f) => f.status === "suggestion")
          .map((feedback) => (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              redirectTo={`feedback/${feedback.id}`}
              upVoted={isFeedbackUpVoted(currentUser.votes ?? [], feedback.id)}
            />
          ))
      )}
    </section>
  );
}

// TODO: Move this into a utils module maybe?
function isFeedbackUpVoted(userVotes: Vote[], feedbackId: string): boolean {
  return userVotes.some((vote) => vote.productRequestId === feedbackId);
}

export default HomePage;
