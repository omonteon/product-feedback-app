import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  defer,
  redirect,
} from "react-router-dom";
import FeedbackEditPage from "../../pages/FeedbackEdit";
import {
  deleteFeedback,
  getFeedbackById,
  updateFeedbackById,
} from "@api/FeedbackAPI";
import { Feedback } from "src/interfaces/Feedback";

export async function loader({ params }: LoaderFunctionArgs) {
  const feedbackPromise = getFeedbackById(params.feedbackId);
  return defer({ feedbackPromise });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  if (updates.intent === "delete") {
    await deleteFeedback(params.feedbackId);
    return redirect("/");
  }
  // Update feedback
  const feedback = {
    id: params.feedbackId,
    title: updates.title,
    category: updates.category,
    description: updates.description,
  } as Feedback;

  const response = await updateFeedbackById(params.feedbackId, feedback);
  if (response.id === feedback.id) {
    return redirect(`../feedback/${feedback.id}`);
  } else {
    throw new Error("There was an issue adding the new feedback");
  }
}

function FeedbackEditRoute() {
  return <FeedbackEditPage />;
}

export default FeedbackEditRoute;
