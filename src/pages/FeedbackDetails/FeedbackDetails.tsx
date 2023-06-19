import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";
import {
  CurrentUser,
  FeedbackDetails as IFeedbackDetails,
  Vote,
} from "src/interfaces/Feedback";
import { ReactComponent as ChevronLeftIcon } from "@assets/chevron-left-icon.svg";
import FeedbackCard from "@components/FeedbackCard";
import Button from "@components/Button";
import Card from "@components/Card";
import Comment from "@components/Comment";
import AddComment from "@components/AddComment";
import styles from "./feedbackDetails.module.css";
import { Suspense } from "react";
import Skeleton from "@components/Skeleton";

type FeedbackDetailsDataTuple = [IFeedbackDetails, CurrentUser];
type FeedbackDetailsData = {
  data: FeedbackDetailsDataTuple;
};

function FeedbackDetailsPage() {
  const { data } = useLoaderData() as FeedbackDetailsData;

  return (
    <main className={styles.feedbackDetails}>
      <header>
        <Link to="..">
          <ChevronLeftIcon /> Go Back
        </Link>

        <Button type="primaryBlue" to="edit">
          Edit Feedback
        </Button>
      </header>
      <Suspense
        fallback={
          <div className={styles.loadingList}>
            <Card>
              <Skeleton />
            </Card>
          </div>
        }
      >
        <Await resolve={data} errorElement={<p>Error loading home data</p>}>
          <FeedbackDetails />
        </Await>
      </Suspense>
    </main>
  );
}

function FeedbackDetails() {
  const [feedback, currentUser] = useAsyncValue() as FeedbackDetailsDataTuple;
  const userVotes = currentUser.votes ?? [];

  return (
    <div className={styles.content}>
      <FeedbackCard
        feedback={feedback}
        upVoted={isFeedbackUpVoted(userVotes, feedback.id)}
      />

      {feedback?.comments && feedback.comments.length > 0 ? (
        <Card className={styles.comments}>
          <h3>{feedback.comments.length} Comments</h3>
          {feedback.comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                feedbackId={feedback.id}
                comment={comment}
                className={styles.comment}
              />
            );
          })}
        </Card>
      ) : null}

      <Card className={`${styles.addComment}`}>
        <h3>Add Comment</h3>
        <AddComment feedbackId={feedback.id} />
      </Card>
    </div>
  );
}

// TODO: Move this unot a utils module maybe?
function isFeedbackUpVoted(userVotes: Vote[], feedbackId: string): boolean {
  return userVotes.some((vote) => vote.productRequestId === feedbackId);
}

export default FeedbackDetailsPage;
