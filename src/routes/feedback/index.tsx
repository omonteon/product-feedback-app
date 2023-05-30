import { Params } from "react-router-dom";
import { FeedbackDetails, Feedback } from "src/interfaces/Feedback";
import { getFeedbackById, updateFeedbackById } from "@api/FeedbackAPI";
import FeedbackDetailsPage from "../../pages/FeedbackDetails";

interface LoaderFunctionArgs {
  params: Params;
}

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<FeedbackDetails> {
  const feedback = await getFeedbackById(Number(params.feedbackId));
  if (!feedback) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return feedback;
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateFeedbackById(Number(params.feedbackId), {
    upvotes: Number(formData.get("upvotes")),
  } as Feedback);
}

export default function FeedbackDetailsRoute() {
  return <FeedbackDetailsPage />;
}
