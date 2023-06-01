import styles from "./skeleton.module.css";

function Skeleton() {
  return (
    <div className={styles.skeleton} aria-busy="true">
      <div className={styles.title} aria-busy="true"></div>
      <div className={styles.paragraph} aria-busy="true"></div>
      <div className={styles.paragraph} aria-busy="true"></div>
      <div className={styles.paragraph} aria-busy="true"></div>
      <div className={styles.paragraph} aria-busy="true"></div>
    </div>
  );
}

export default Skeleton;
