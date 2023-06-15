import { Params, ActionFunctionArgs, defer } from "react-router-dom";
import { Feedback } from "src/interfaces/Feedback";
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

export async function loader({ params }: LoaderFunctionArgs) {
  const feedback = getFeedbackById(params.feedbackId);
  const currentUser = getCurrentUser();

  return defer({ data: Promise.all([feedback, currentUser]) });
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.feedbackId) {
    throw new Error("Feedback id missing");
  }
  const feedbackId = params.feedbackId;
  const formData = await request.formData();
  const intent = formData.get("intent");
  const currentUser = await getCurrentUser();

  console.log(intent);

  if (intent === "addComment") {
    const comment = formData.get("comment");
    console.log(comment);
  } else if (intent === "upVote") {
    const upVoted = formData.get("upVoted") === "true";
    console.log(upVoted);
    // TODO: I don't think this could should be here...
    const updatedCurrentUser = {
      ...currentUser,
      votes: upVoted
        ? currentUser.votes?.concat({
            productRequestId: feedbackId,
            voted: "up",
          })
        : currentUser.votes?.filter(
            (vote) => vote.productRequestId !== feedbackId
          ),
    };

    await updateCurrentUser(updatedCurrentUser);
  }

  return updateFeedbackById(params.feedbackId, {
    upvotes: Number(formData.get("upvotes")),
  } as Feedback);
}

export default function FeedbackDetailsRoute() {
  return <FeedbackDetailsPage />;
}
