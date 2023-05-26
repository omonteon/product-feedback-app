import { useEffect, useState } from "react";
import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import Button from "@components/Button";
import styles from "./home.module.css";
import Sidebar from "@components/Sidebar";
import EmptyFeedback from "@components/EmptyFeedback";
import { Feedback } from "src/interfaces/Feedback";
import FeedbackCard from "@components/FeedbackCard";
import { getFeedbackList } from "@api/FeedbackAPI";

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
// 8. Rename all index.tsx files to index.ts because they don't contain jsx
// 9. Install and configure ESLint
// 10. Define naming convention for event handler props and event handler functions
// 11. Read and define convention on how to use size units in the project (CSS).

// TODO: Get this from some API or from localStorage

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    setFeedbackList(getFeedbackList());
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleToggleVote = (id: number) => {
    const updatedList = feedbackList.map((feedback) => {
      if (feedback.id === id) {
        return {
          ...feedback,
          upVoteCount: feedback.upVoted
            ? feedback.upVoteCount - 1
            : feedback.upVoteCount + 1,
          upVoted: !feedback.upVoted,
        };
      }
      return feedback;
    });
    setFeedbackList(updatedList);
    // TODO: Update in API or localstorage
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
          <Button onClick={() => console.log("Add Feedback")}>
            + Add Feedback
          </Button>
        </header>
        <section className={styles.mainContent}>
          {feedbackList.length === 0 ? (
            <EmptyFeedback />
          ) : (
            feedbackList.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                feedback={feedback}
                redirectTo={`feedback/${feedback.id}`}
                onToggleVote={handleToggleVote}
              />
            ))
          )}
        </section>
      </main>
    </>
  );
}

export default HomePage;
