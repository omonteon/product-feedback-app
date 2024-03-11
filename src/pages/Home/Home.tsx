import { Suspense, useState } from "react";
import {
  Await,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { CurrentUser, Feedback } from "src/interfaces/Feedback";
import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import Button from "@components/Button";
import Sidebar from "@components/Sidebar";
import Skeleton from "@components/Skeleton";
import Card from "@components/Card";
import styles from "./home.module.css";
import TagsCard from "@components/TagsCard";
import RoadmapSummaryCard from "@components/RoadmapSummaryCard";
import FeedbackList from "@components/FeedbackList";

// Next tasks
// 6. Create RoadmapCard component (1 pomodoro)
// 7. Create Column component (1 pomodoro)
// 8. Create Tabs component (3 pomodoros)
// 9. Create Roadmap page component (header + main) (3 pomodoros)
// 10. Prepare to support DnD (1 pomodoro)
// 11. Styles for tablet version (4 pomodoros)
// 12. Create Non-existent components for smartphone (2 pomodoros)
// 13. Styles for desktop version (4 pomodoros)
// 14. Write tests (8 pomodoros)
// 15. Corner case: There are two suggestions with the same upvotes, the list is sorted by most upvotes and you upvote the bottom one. It should sort the list accordingly.

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

// TODO: This is repeated in several places, put it in a shared file
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
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const { data } = useLoaderData() as HomeData;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loading = navigation.state === "loading";
  const defaultTag = searchParams.get("q")?.toString();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Suspense
        fallback={
          <div className={`${styles.container} ${loading && styles.loading}`}>
            <header className={styles.header}>
              <nav className={styles.nav}>
                <div>
                  <h1>Frontend Mentor</h1>
                  <h2>Feedback board</h2>
                </div>
              </nav>
              <div className={styles.headerCards}>
                <Card className={styles.title}>
                  <div>
                    <h1>Frontend Mentor</h1>
                    <h2>Feedback board</h2>
                  </div>
                </Card>
                <TagsCard defaultTag={defaultTag} />
                <RoadmapSummaryCard feedbackList={[]} />
              </div>
            </header>
            <main className={styles.main}>
              <header>
                <p>
                  Sort by :{" "}
                  <b>
                    {sortByOptions[0].label} <ChevronIcon />{" "}
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
          <div className={`${styles.container} ${loading && styles.loading}`}>
            <header className={styles.header}>
              <nav className={styles.nav}>
                <div>
                  <h1>Frontend Mentor</h1>
                  <h2>Feedback board</h2>
                </div>
                {/* TODO: Fix keyboard navigation which enters the sidebar when is hidden */}
                <Sidebar open={sidebarOpen} toggle={toggleSidebar} />
              </nav>
              {/* TODO: Make a component for this */}
              <div className={styles.headerCards}>
                <Card className={styles.title}>
                  <div>
                    <h1>Frontend Mentor</h1>
                    <h2>Feedback board</h2>
                  </div>
                </Card>
                <TagsCard defaultTag={defaultTag} />
                <RoadmapSummaryCard feedbackList={[]} />
              </div>
            </header>
            <main className={styles.main}>
              <FeedbackList loading={loading} />
            </main>
          </div>
        </Await>
      </Suspense>
    </>
  );
}

export default HomePage;
