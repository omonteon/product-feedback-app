import RoadmapPage from "../../pages/Roadmap";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  defer,
} from "react-router-dom";
import {
  getFeedbackList,
  getCurrentUser,
  updateCurrentUser,
  updateFeedbackById,
} from "@api/FeedbackAPI";
import { Feedback, FeedbackStatus } from "src/interfaces/Feedback";

export async function loader({ request }: LoaderFunctionArgs) {
  const statuses: FeedbackStatus[] = ["planned", "in-progress", "live"];
  const feedbackListPromise = getFeedbackList("", "", statuses);
  const currentUserPromise = getCurrentUser();

  return defer({
    data: Promise.all([feedbackListPromise, currentUserPromise]),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const feedbackId = formData.get("feedbackId")?.toString();
  if (!feedbackId) {
    throw new Error("Feedback id missing");
  }
  const upVoted = formData.get("upVoted") === "true";
  const currentUser = await getCurrentUser();
  const updatedCurrentUser = {
    ...currentUser,
    votes: upVoted
      ? currentUser.votes?.concat({ productRequestId: feedbackId, voted: "up" })
      : currentUser.votes?.filter(
          (vote) => vote.productRequestId !== feedbackId
        ),
  };
  await updateCurrentUser(updatedCurrentUser);

  return updateFeedbackById(feedbackId, {
    upvotes: Number(formData.get("upvotes")),
  } as Feedback);
}

function RoadmapRoute() {
  return <RoadmapPage />;
}

export default RoadmapRoute;
