import { useState } from "react";
import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import Button from "@components/Button";
import styles from "./home.module.css";
import Sidebar from "@components/Sidebar";

// Next tasks
// 1. Create Card component [DONE]
// 2. Create CheckableTag component
// * I think checkable tag can exist by itself
// * However, in this particular case, we need a list of those
// that behave like a radio button instead
// 3. Create Badge component
// 4. Implement Tag filters card component
// 5. Implement Roadmap card component
// 6. Implement DropDown component
// 7. Implement empty home card component

function HomePage() {
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
            Sort by : Most Upvotes <ChevronIcon />{" "}
          </p>
          <Button onClick={() => console.log("Add Feedback")}>
            + Add Feedback
          </Button>
        </header>
        <section>{/* TODO: List of feedback cards */}</section>
      </main>
    </>
  );
}

export default HomePage;
