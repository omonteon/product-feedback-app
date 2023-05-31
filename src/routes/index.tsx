import { ActionFunctionArgs } from "react-router-dom";
import { CurrentUser, Feedback } from "src/interfaces/Feedback";
import {
  getFeedbackList,
  getCurrentUser,
  updateFeedbackById,
  updateCurrentUser,
} from "@api/FeedbackAPI";
import HomePage from "../pages/Home";

interface HomeData {
  feedbackList: Feedback[];
  currentUser: CurrentUser;
}

export async function loader(): Promise<HomeData> {
  const feedbackList = await getFeedbackList();
  const currentUser = await getCurrentUser();
  if (!feedbackList) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { feedbackList, currentUser };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const feedbackId = Number(formData.get("feedbackId"));
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
