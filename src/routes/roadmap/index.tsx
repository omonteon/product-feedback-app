import RoadmapPage from "../../pages/Roadmap";
import { LoaderFunctionArgs, defer } from "react-router-dom";
import { getFeedbackList, getCurrentUser } from "@api/FeedbackAPI";
import { FeedbackStatus } from "src/interfaces/Feedback";

export async function loader({ request }: LoaderFunctionArgs) {
  const statuses: FeedbackStatus[] = ["planned", "in-progress", "live"];
  const feedbackListPromise = getFeedbackList("", "", statuses);
  const currentUserPromise = getCurrentUser();

  return defer({
    data: Promise.all([feedbackListPromise, currentUserPromise]),
  });
}

function RoadmapRoute() {
  return <RoadmapPage />;
}

export default RoadmapRoute;
