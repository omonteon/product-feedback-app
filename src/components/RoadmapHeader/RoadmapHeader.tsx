import GoBackLink from "@components/GoBackLink";
import styles from "./roadmapHeader.module.css";
import Button from "@components/Button";

function RoadmapHeader() {
  return (
    <header className={styles.roadmapHeader}>
      <div>
        <GoBackLink />
        <h1>Roadmap</h1>
      </div>
      <Button to="/feedback/new">+ Add Feedback</Button>
    </header>
  );
}

export default RoadmapHeader;
