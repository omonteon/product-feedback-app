export type FeedbackTag =
  | "All"
  | "UI"
  | "UX"
  | "Enhancement"
  | "Bug"
  | "Feature";

export interface Feedback {
  id: number;
  title: string;
  description: string;
  tag: FeedbackTag;
  upVoteCount: number;
  commentCount: number;
}
