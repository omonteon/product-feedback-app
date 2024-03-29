export type FeedbackTag =
  | "All"
  | "UI"
  | "UX"
  | "Enhancement"
  | "Bug"
  | "Feature";

export type FeedbackStatus = "planned" | "in-progress" | "live" | "suggestion";

export interface Feedback {
  id: string;
  title: string;
  category: FeedbackTag;
  upvotes: number;
  status: FeedbackStatus;
  description: string;
  commentCount: number;
}

export interface FeedbackDetails extends Feedback {
  comments?: Comment[];
}

export interface FeedbackAPIResponse {
  currentUser: CurrentUser;
  productRequests: ProductRequest[];
}

// TODO: Separate these interfaces into their own files
export interface Vote {
  productRequestId: string;
  voted: "up" | "down";
}

export interface CurrentUser {
  image: string;
  name: string;
  username: string;
  votes?: Vote[];
}

export interface Comment {
  id: string;
  content: string;
  user: User;
  replies?: CommentReply[];
}

export interface CommentReply {
  id: string;
  content: string;
  replyingTo: string;
  user: User;
}

export interface ProductRequest {
  id: string;
  title: string;
  category: FeedbackTag;
  upvotes: number;
  status: FeedbackStatus;
  description: string;
  comments?: Comment[];
}

export interface User {
  image: string;
  name: string;
  username: string;
}
