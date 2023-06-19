import { Params, ActionFunctionArgs, defer } from "react-router-dom";
import {
  Feedback,
  FeedbackDetails,
  Comment,
  CommentReply,
} from "src/interfaces/Feedback";
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

  console.log(Object.fromEntries(formData));

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
  } else if (intent === "replyComment") {
    const feedback = await getFeedbackById(params.feedbackId);
    if (feedback.comments === undefined) {
      throw new Error(
        `Feedback with id ${feedback.id} has no comments to reply to`
      );
    }
    const content = formData.get("comment")?.toString() ?? "";
    const commentId = formData.get("commentId")?.toString() ?? "";
    const reply: CommentReply = {
      content,
      replyingTo: currentUser.username,
      user: {
        image: currentUser.image,
        name: currentUser.name,
        username: currentUser.username,
      },
    };
    const commentUpdated = feedback.comments?.find(
      (comment) => comment.id === commentId
    );
    if (commentUpdated === undefined) {
      throw new Error(`Could not find comment to reply to (id: ${commentId})`);
    }

    if (Array.isArray(commentUpdated.replies)) {
      commentUpdated.replies.push(reply);
    } else {
      commentUpdated.replies = [reply];
    }

    return updateFeedbackById(params.feedbackId, {
      comments: feedback.comments.map((comment) => {
        if (comment.id === commentId) {
          return commentUpdated;
        }
        return comment;
      }),
    } as FeedbackDetails);
  } else if (intent === "upVote") {
    const upVoted = formData.get("upVoted") === "true";
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

  return null;
}

export default function FeedbackDetailsRoute() {
  return <FeedbackDetailsPage />;
}
