import { Feedback } from "src/interfaces/Feedback";

function getFeedbackList(): Feedback[] {
  const feedbackListJSONStr = localStorage.getItem("feedbackList");
  return JSON.parse(feedbackListJSONStr ?? "");
}

function getFeedbackById(id: number | undefined): Feedback {
  if (id === undefined) {
    throw new Error("There was no id provided to get the feedback item.");
  }
  const feedbackListJSONStr: string =
    localStorage.getItem("feedbackList") ?? "";
  const feedbackList: Feedback[] = JSON.parse(feedbackListJSONStr ?? "");
  const feedbackItem =
    feedbackList.find((feedback) => feedback.id === id) ?? null;
  if (feedbackItem === null) {
    throw new Error(`Feedback item with id ${id} was not found`);
  }
  return feedbackItem;
}

export { getFeedbackList, getFeedbackById };
