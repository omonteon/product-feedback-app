import { Suspense, useState } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";
import { CurrentUser, Feedback, Vote } from "src/interfaces/Feedback";
import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import Button from "@components/Button";
import Sidebar from "@components/Sidebar";
import EmptyFeedback from "@components/EmptyFeedback";
import FeedbackCard from "@components/FeedbackCard";
import Skeleton from "@components/Skeleton";
import Card from "@components/Card";
import styles from "./home.module.css";

// Next tasks
// 0. Add "status" field when editing feedback. Filter suggestions in home to show only "suggestions" (4 pomodoros)
// 1. Implement filtering by tag (3 pomodoros)
// 2. Show correct number of feedback by category in the sidebar (2 pomodoros)
// 3. Implement comment creation and replies too (4 pomodoros)
// 4. Implement sorting dropdown (2 pomodoros)
// 5. Implement sorting logic in the "API" (2 pomodoros)
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

function HomePage() {
  const { data } = useLoaderData() as HomeData;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1>Frontend Mentor</h1>
          <h2>Feedback board</h2>
        </div>
        {/* TODO: Fix keyboard navigation which enters the sidebar when is hidden */}
        <Sidebar open={sidebarOpen} toggle={toggleSidebar} />
      </header>
      <main className={styles.main}>
        <header>
          <p>
            {/* TODO: Create and use dropdown component here */}
            Sort by :{" "}
            <b>
              Most Upvotes <ChevronIcon />{" "}
            </b>
          </p>
          <Button to="/feedback/new">+ Add Feedback</Button>
        </header>
        <Suspense
          fallback={
            <div className={styles.loadingList}>
              <Card>
                <Skeleton />
              </Card>
            </div>
          }
        >
          <Await resolve={data} errorElement={<p>Error loading home data</p>}>
            <FeedbackList />
          </Await>
        </Suspense>
      </main>
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
