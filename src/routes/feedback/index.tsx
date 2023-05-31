import { Params, ActionFunctionArgs } from "react-router-dom";
import { FeedbackDetails, Feedback, Vote } from "src/interfaces/Feedback";
import {
  getCurrentUser,
  getFeedbackById,
  updateCurrentUser,
  updateFeedbackById,
} from "@api/FeedbackAPI";
import FeedbackDetailsPage from "../../pages/FeedbackDetails";

interface LoaderFunctionArgs {
  params: Params;
}

interface LoaderFunctionReturn {
  userVotes: Vote[];
  feedback: FeedbackDetails;
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<LoaderFunctionReturn> {
  const feedback = await getFeedbackById(Number(params.feedbackId));
  const currentUser = await getCurrentUser();
  if (!feedback || !currentUser) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { userVotes: currentUser.votes ?? [], feedback };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const feedbackId = Number(params.feedbackId);
  let formData = await request.formData();

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

  return updateFeedbackById(Number(params.feedbackId), {
    upvotes: Number(formData.get("upvotes")),
  } as Feedback);
}

export default function FeedbackDetailsRoute() {
  return <FeedbackDetailsPage />;
}
