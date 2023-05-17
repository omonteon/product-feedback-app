import styles from "./home.module.css";
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";
import { ReactComponent as HamIcon } from "../../assets/ham-icon.svg";
import { ReactComponent as ChevronIcon } from "../../assets/chevron-icon.svg";
import { useState } from "react";
import Button from "@components/Button";
import Drawer from "@components/Drawer";

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
          <Button
            tabIndex={0}
            onClick={() => console.log("Click inside drawer")}
          >
            button
          </Button>
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
