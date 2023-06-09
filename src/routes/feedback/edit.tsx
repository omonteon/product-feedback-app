import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  // defer,
  redirect,
} from "react-router-dom";
import FeedbackEditPage from "../../pages/FeedbackEdit";
import { getFeedbackById, updateFeedbackById } from "@api/FeedbackAPI";
import { Feedback } from "src/interfaces/Feedback";

export async function loader({ params }: LoaderFunctionArgs) {
  const feedback = await getFeedbackById(params.feedbackId);

  // TODO: Implement defer to show loading state
  // return defer({ feedback });
  return { feedback };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
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
