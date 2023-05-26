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
  status: string; // TODO: Create type with different status
  upVoteCount: number;
  commentCount: number;
  upVoted: boolean;
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
  productRequestId: number;
  voted: "up" | "down";
}

export interface CurrentUser {
  image: string;
  name: string;
  username: string;
  votes?: Vote[]; // Array of votes made by the user
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
  id: number;
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
