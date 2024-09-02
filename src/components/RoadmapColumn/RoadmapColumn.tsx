import styles from "./roadmapColumn.module.css";

interface RoadmapColumnProps {
  title: string;
  count: number;
  description: string;
  children: React.ReactNode;
}

function RoadmapColumn({
  title,
  count,
  description,
  children,
}: RoadmapColumnProps) {
  return (
    <div className={styles.column}>
      <header className={styles.header}>
        <h3>
          {title} ({count})
        </h3>
        <p>{description}</p>
      </header>
      {children}
    </div>
  );
}

export default RoadmapColumn;
