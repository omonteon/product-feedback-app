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

export interface FeedbackAPIResponse {
  currentUser: User;
  productRequests: ProductRequest[];
}

export interface Vote {
  productRequestId: number;
  voted: "up" | "down";
}

export interface User {
  image: string;
  name: string;
  username: string;
  votes?: Vote[]; // Array of votes made by the user
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replyingTo?: string;
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
