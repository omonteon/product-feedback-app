import RoadmapHeader from "@components/RoadmapHeader";
import styles from "./roadmap.module.css";

function RoadmapPage() {
  return (
    <div className={`${styles.container}`}>
      <RoadmapHeader />
      <main className={styles.main}>{/* <FeedbackListHeader /> */}</main>
    </div>
  );
}

export default RoadmapPage;
