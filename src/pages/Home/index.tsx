import { useState } from "react";
import { ReactComponent as CloseIcon } from "@assets/close-icon.svg";
import { ReactComponent as HamIcon } from "@assets/ham-icon.svg";
import { ReactComponent as ChevronIcon } from "@assets/chevron-icon.svg";
import Button from "@components/Button";
import Drawer from "@components/Drawer";
import styles from "./home.module.css";
import Card from "@components/Card";

// Next tasks
// 1. Create Card component
// 2. Create CheckableTag component
// 3. Create Badge component
// 4. Implement Tag filters card component
// 5. Implement Roadmap card component
// 6. Implement DropDown component
// 7. Implement empty home card component

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <h1>Frontend Mentor</h1>
          <h2>Feedback board</h2>
        </div>
        <Drawer
          isOpen={menuOpen}
          toggleButton={
            <Button
              type="clean"
              ariaExpanded={menuOpen}
              ariaControls="drawer"
              onClick={toggleMenu}
            >
              {menuOpen ? <CloseIcon /> : <HamIcon />}
            </Button>
          }
          toggle={toggleMenu}
        >
          <Card>
            <Button
              tabIndex={0}
              onClick={() => console.log("Click inside drawer")}
            >
              button
            </Button>
          </Card>
        </Drawer>
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
