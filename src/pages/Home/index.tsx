import styles from "./home.module.css";

function HomePage() {
  return (
    <>
      <header className={styles.header}>
        {/* TODO: Logo and title */}
        <h1>Frontend Mentor</h1>
        <h2>Feedback board</h2>
      </header>
      <main>
        Home Page
        <header>
          {/* TODO: Top bar with sorting component + buton to add feedback (link to section) */}
        </header>
        <section>{/* TODO: List of feedback cards */}</section>
      </main>
    </>
  );
}

export default HomePage;
