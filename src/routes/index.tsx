import { CurrentUser, Feedback } from "src/interfaces/Feedback";
import HomePage from "../pages/Home";
import { getFeedbackList, getCurrentUser } from "@api/FeedbackAPI";

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

export default function RootRoute() {
  return <HomePage />;
}
