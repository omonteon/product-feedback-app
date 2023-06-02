import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { CurrentUser, Feedback, Vote } from "src/interfaces/Feedback";
import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import Button from "@components/Button";
import Sidebar from "@components/Sidebar";
import EmptyFeedback from "@components/EmptyFeedback";
import FeedbackCard from "@components/FeedbackCard";
import styles from "./home.module.css";
import Skeleton from "@components/Skeleton";
import Card from "@components/Card";

// Next tasks
// 1. Create Card component [DONE]
// 2. Create CheckableTag component [DONE]
// * I think checkable tag can exist by itself
// * However, in this particular case, we need a list of those
// that behave like a radio button instead
// 3. Create Badge component [DONE]
// 4. Implement Tag filters card component [DONE]
// 5. Implement Roadmap card component [DONE]
// 6. Implement DropDown component [PENDING]
// 7. Implement empty home card component [DONE]
// 8. Rename all index.tsx files to index.ts because they don't contain jsx [DONE]
// 9. Install and configure ESLint [DONE]
// 10. Define naming convention for event handler props and event handler functions.
// 11. Read and define convention on how to use size units in the project (CSS).
// 12. How to type rr6 loaders ? https://github.com/remix-run/react-router/discussions/9792 [DONE]
// 13. Use Context API to share the current user data
// 14. Maybe change everything to be called ProductRequest instead of Feedback ?
// 15. Document the order in which imports should be done
// 16. Configure testing enviroment
// 17. Add "Page" suffix at the end of page components
// 18. Improve how icons are imported

function HomePage() {
  const data = useLoaderData();
  const { currentUserPromise, feedbackListPromise } = data as {
    currentUserPromise: Promise<CurrentUser>;
    feedbackListPromise: Promise<Feedback[]>;
  };

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
          <Await
            resolve={feedbackListPromise}
            errorElement={<p>Error loading home data</p>}
          >
            {/* TODO: Refactor this to use hook instead of render props */}
            {(feedbackList: Feedback[]) => (
              <Await
                resolve={currentUserPromise}
                // TODO: Create a better error element
                errorElement={<p>Error loading home data</p>}
              >
                {(currentUser: CurrentUser) => (
                  <section className={styles.mainContent}>
                    {feedbackList?.length === 0 ? (
                      <EmptyFeedback />
                    ) : (
                      feedbackList?.map((feedback) => (
                        <FeedbackCard
                          key={feedback.id}
                          feedback={feedback}
                          redirectTo={`feedback/${feedback.id}`}
                          upVoted={isFeedbackUpVoted(
                            currentUser.votes ?? [],
                            feedback.id
                          )}
                        />
                      ))
                    )}
                  </section>
                )}
              </Await>
            )}
          </Await>
        </Suspense>
      </main>
    </>
  );
}

// TODO: Move this unot a utils module maybe?
function isFeedbackUpVoted(userVotes: Vote[], feedbackId: number): boolean {
  return userVotes.some((vote) => vote.productRequestId === feedbackId);
}

export default HomePage;
