import { Params, ActionFunctionArgs, defer } from "react-router-dom";
import { Feedback, FeedbackDetails, Comment } from "src/interfaces/Feedback";
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

  if (intent === "addComment") {
    const feedback = await getFeedbackById(params.feedbackId);
    const commentText = formData.get("comment")?.toString() ?? "";
    const comment: Comment = {
      id: crypto.randomUUID(),
      content: commentText,
      user: {
        image: currentUser.image,
        name: currentUser.name,
        username: currentUser.username,
      },
    };
    return updateFeedbackById(params.feedbackId, {
      comments:
        Array.isArray(feedback.comments) && feedback.comments.length > 0
          ? feedback.comments?.concat(comment)
          : [comment],
    } as FeedbackDetails);
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
    return updateFeedbackById(params.feedbackId, {
      upvotes: Number(formData.get("upvotes")),
    } as Feedback);
  }
}

export default function FeedbackDetailsRoute() {
  return <FeedbackDetailsPage />;
}
