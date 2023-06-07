import {
  CurrentUser,
  Feedback,
  FeedbackAPIResponse,
  FeedbackDetails,
  ProductRequest,
} from "src/interfaces/Feedback";

async function getFeedbackList(): Promise<Feedback[]> {
  const dataStr: string = localStorage.getItem("data") ?? "";
  const data: FeedbackAPIResponse = JSON.parse(dataStr ?? "");
  const productRequests: ProductRequest[] = data.productRequests;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(adaptProductRequestsToFeedbackList(productRequests));
    }, 1000);
  });
}

async function getCurrentUser(): Promise<CurrentUser> {
  const dataStr: string = localStorage.getItem("data") ?? "";
  const data: FeedbackAPIResponse = JSON.parse(dataStr ?? "");
  const currentUser = data.currentUser;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(currentUser);
    }, 1000);
  });
}

async function getFeedbackById(id: string | undefined): Promise<Feedback> {
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
  // TODO: Implement rejection too
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(adaptProductRequestToFeedbackDetails(productRequestItem));
    }, 1000);
  });
}

async function updateFeedbackById(
  id: string | undefined,
  feedbackUpdated: Feedback
): Promise<Feedback> {
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
  // productRequestItem = { ...productRequestItem, ...feedbackUpdated };
  Object.assign(productRequestItem, feedbackUpdated);
  localStorage.setItem("data", JSON.stringify({ ...data, productRequests }));
  // TODO: Implement rejection too
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(productRequestItem as FeedbackDetails);
  //   }, 1000);
  // });
  return productRequestItem as FeedbackDetails;
}

async function updateCurrentUser(
  currentUserUpdated: CurrentUser
): Promise<CurrentUser> {
  const dataStr: string = localStorage.getItem("data") ?? "";
  const data: FeedbackAPIResponse = JSON.parse(dataStr ?? "");
  const currentUser = data.currentUser;

  Object.assign(currentUser, currentUserUpdated);
  localStorage.setItem("data", JSON.stringify({ ...data, currentUser }));
  // TODO: Implement rejection too
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(productRequestItem as FeedbackDetails);
  //   }, 1000);
  // });
  return currentUser;
}

export async function addNewFeedback(
  feedback: Feedback
): Promise<ProductRequest> {
  const dataStr: string = localStorage.getItem("data") ?? "";
  const data: FeedbackAPIResponse = JSON.parse(dataStr ?? "");
  const productRequests: ProductRequest[] = data.productRequests;
  const productRequest = {
    ...feedback,
    comments: [],
  } as ProductRequest;

  localStorage.setItem(
    "data",
    JSON.stringify({
      ...data,
      productRequests: [productRequest, ...productRequests],
    })
  );
  // TODO: Implement rejection too
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(feedback);
    }, 1000);
  });
}

// Adapters

function adaptProductRequestToFeedbackDetails(
  productRequest: ProductRequest
): FeedbackDetails {
  return {
    id: productRequest.id,
    title: productRequest.title,
    description: productRequest.description,
    category: productRequest.category,
    status: productRequest.status,
    upvotes: productRequest.upvotes,
    // upVoted: false,
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
    category: productRequest.category,
    status: productRequest.status,
    upvotes: productRequest.upvotes,
    // upVoted: false,
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
export {
  getFeedbackList,
  getCurrentUser,
  getFeedbackById,
  updateFeedbackById,
  updateCurrentUser,
};
