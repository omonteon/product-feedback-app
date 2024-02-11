import { Await, useLoaderData } from "react-router-dom";
import { ReactComponent as EditFeedbackIcon } from "@assets/shared/icon-edit-feedback.svg";
import { Feedback } from "src/interfaces/Feedback";
import Card from "@components/Card";
import FeedbackForm from "@components/FeedbackForm";
import styles from "./feedbackEdit.module.css";
import { Suspense } from "react";
import Skeleton from "@components/Skeleton";
import GoBackLink from "@components/GoBackLink";
import FeedbackFormCard from "@components/FeedbackFormCard";

function FeedbackEditPage() {
  const { feedbackPromise } = useLoaderData() as {
    feedbackPromise: Promise<Feedback>;
  };

  return (
    <div className={styles.container}>
      <header>
        <GoBackLink />
      </header>
      <main>
        <Suspense
          fallback={
            <div className={styles.loadingList}>
              <Card>
                <Skeleton />
              </Card>
            </div>
          }
        >
          <Await
            resolve={feedbackPromise}
            errorElement={<p>Error loading data</p>}
          >
            {(feedback) => (
              <FeedbackFormCard
                icon={<EditFeedbackIcon />}
                title={`Editing ${feedback.title}`}
              >
                <FeedbackForm defaultFeedback={feedback} editing={true} />
              </FeedbackFormCard>
            )}
          </Await>
        </Suspense>
      </main>
    </div>
  );
}

export default FeedbackEditPage;
