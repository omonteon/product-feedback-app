import styles from "./home.module.css";
import { ReactComponent as CloseIcon } from "../../assets/close-icon.svg";
import { ReactComponent as HamIcon } from "../../assets/ham-icon.svg";
import { ReactComponent as ChevronIcon } from "../../assets/chevron-icon.svg";
import { useState } from "react";

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
        {menuOpen ? (
          <CloseIcon onClick={toggleMenu} />
        ) : (
          <HamIcon onClick={toggleMenu} />
        )}
      </header>
      <main className={styles.main}>
        <header>
          <p>
            Sort by : Most Upvotes <ChevronIcon />{" "}
          </p>
          <button className={styles.button}>+ Add Feedback</button>
        </header>
        <section>{/* TODO: List of feedback cards */}</section>
      </main>
    </>
  );
}

export default HomePage;
