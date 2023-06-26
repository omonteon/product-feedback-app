import { Link } from "react-router-dom";
import { Feedback } from "src/interfaces/Feedback";
import Badge from "@components/Badge";
import Card from "@components/Card";
import styles from "./roadmapSummaryCard.module.css";

interface RoadmapSummaryCardProps {
  feedbackList: Feedback[];
}

function RoadmapSummaryCard({ feedbackList }: RoadmapSummaryCardProps) {
  const countByStatus = getCountbyStatus(feedbackList);
  const statusList = [
    {
      text: "Planned",
      count: countByStatus.planned,
      color: getCSSVariableValue("--accent-orange"),
    },
    {
      text: "In-Progress",
      count: countByStatus["in-progress"],
      color: getCSSVariableValue("--primary-purple"),
    },
    {
      text: "Live",
      count: countByStatus.live,
      color: getCSSVariableValue("--accent-blue"),
    },
  ];

  return (
    <Card className={styles.roadMapCard}>
      <header>
        <h4>Roadmap</h4> <Link to="roadmap">View</Link>
      </header>
      <ul>
        {statusList.map((status) => (
          <li key={status.text}>
            <Badge
              color={status.color}
              text={
                <>
                  {status.text} <b>{status.count}</b>
                </>
              }
              className={styles.roadMapBadge}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

// TODO: Probably move to utils
function getCSSVariableValue(varName: string) {
  const style = getComputedStyle(document.body);
  return style.getPropertyValue(varName);
}

function getCountbyStatus(feedbackList: Feedback[]) {
  const countByStatus = {
    suggestion: 0,
    planned: 0,
    "in-progress": 0,
    live: 0,
  };
  feedbackList.forEach((feedback) => {
    countByStatus[feedback.status] += 1;
  });

  return countByStatus;
}

export default RoadmapSummaryCard;
