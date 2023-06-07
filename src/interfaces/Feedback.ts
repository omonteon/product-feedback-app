export type FeedbackTag =
  | "All"
  | "UI"
  | "UX"
  | "Enhancement"
  | "Bug"
  | "Feature";

export interface Feedback {
  id: string;
  title: string;
  category: FeedbackTag;
  upvotes: number;
  status: string;
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
  id: number;
  content: string;
  user: User;
  replies: CommentReply[];
}

export interface CommentReply {
  content: string;
  replyingTo: string;
  user: User;
}

export interface ProductRequest {
  id: string;
  title: string;
  category: FeedbackTag;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
}

export interface User {
  image: string;
  name: string;
  username: string;
}
