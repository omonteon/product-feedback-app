import { Await, useLoaderData } from "react-router-dom";
import { ReactComponent as PlusIcon } from "@assets/plus-icon.svg";
import { Feedback } from "src/interfaces/Feedback";
import Card from "@components/Card";
import FeedbackForm from "@components/FeedbackForm";
import styles from "./feedbackEdit.module.css";
import { Suspense } from "react";
import Skeleton from "@components/Skeleton";
import GoBackLink from "@components/GoBackLink";

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
        <span className={styles.plusIcon}>
          <PlusIcon />
        </span>
        <Card>
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
              errorElement={<p>Error loading home data</p>}
            >
              {(feedback) => (
                <>
                  <h3>Editing {feedback.title}</h3>
                  <FeedbackForm defaultFeedback={feedback} editing={true} />
                </>
              )}
            </Await>
          </Suspense>
        </Card>
      </main>
    </div>
  );
}

export default FeedbackEditPage;
