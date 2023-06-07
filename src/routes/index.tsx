import { ActionFunctionArgs, defer } from "react-router-dom";
import { Feedback } from "src/interfaces/Feedback";
import {
  getFeedbackList,
  getCurrentUser,
  updateFeedbackById,
  updateCurrentUser,
} from "@api/FeedbackAPI";
import HomePage from "../pages/Home";

export async function loader() {
  const feedbackListPromise = getFeedbackList();
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
  // TODO: Maybe we can get the "checked" property ??
  const upVoted = formData.get("upVoted") === "true";
  const currentUser = await getCurrentUser();
  // TODO: I don't think this could should be here...
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

export default function RootRoute() {
  return <HomePage />;
}
