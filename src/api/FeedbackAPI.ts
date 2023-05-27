import {
  Feedback,
  FeedbackAPIResponse,
  FeedbackDetails,
  ProductRequest,
} from "src/interfaces/Feedback";

function getFeedbackList(): Feedback[] {
  const dataStr: string = localStorage.getItem("data") ?? "";
  const data: FeedbackAPIResponse = JSON.parse(dataStr ?? "");
  const productRequests: ProductRequest[] = data.productRequests;

  return adaptProductRequestsToFeedbackList(productRequests);
}

function getFeedbackById(id: number | undefined): Feedback {
  if (id === undefined) {
    throw new Error("There was no id provided to get the feedback item.");
  }
  const dataStr: string = localStorage.getItem("data") ?? "";
  const data: FeedbackAPIResponse = JSON.parse(dataStr ?? "");
  const productRequests: ProductRequest[] = data.productRequests;
  const productRequestItem = productRequests.find((pr) => pr.id === id) ?? null;
  if (productRequestItem === null) {
    throw new Error(`Feedback item with id ${id} was not found`);
  }
  // TODO: Convert this in a different function
  return adaptProductRequestToFeedbackDetails(productRequestItem);
}

function adaptProductRequestToFeedbackDetails(
  productRequest: ProductRequest
): FeedbackDetails {
  return {
    id: productRequest.id,
    title: productRequest.title,
    description: productRequest.description,
    tag: productRequest.category,
    status: productRequest.status,
    upVoteCount: productRequest.upvotes,
    upVoted: false,
    commentCount: productRequest.comments?.length ?? 0, // FIXME: this has to include replies too
    comments: productRequest.comments,
  };
}

function adaptProductRequestToFeedback(
  productRequest: ProductRequest
): Feedback {
  return {
    id: productRequest.id,
    title: productRequest.title,
    description: productRequest.description,
    tag: productRequest.category,
    status: productRequest.status,
    upVoteCount: productRequest.upvotes,
    upVoted: false,
    commentCount: productRequest.comments?.length ?? 0,
  };
}

function adaptProductRequestsToFeedbackList(
  productRequests: ProductRequest[]
): Feedback[] {
  return productRequests.map((productRequest) => {
    return adaptProductRequestToFeedback(productRequest);
  });
}
export { getFeedbackList, getFeedbackById };
