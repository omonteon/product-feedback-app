import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import RoadmapHeader from "@components/RoadmapHeader";
import RoadmapFeedbackList from "@components/RoadmapFeedbackList";
import { CurrentUser, Feedback } from "src/interfaces/Feedback";
import styles from "./roadmap.module.css";

type HomeDataTuple = [Feedback[], CurrentUser];
type HomeData = {
  data: HomeDataTuple;
};

function RoadmapPage() {
  const { data } = useLoaderData() as HomeData;

  return (
    <Suspense fallback={<>Fallback</>}>
      <Await resolve={data} errorElement={<p>Error loading home data</p>}>
        {(resolvedData: HomeDataTuple) => (
          <RoadmapContent data={resolvedData} />
        )}
      </Await>
    </Suspense>
  );
}

function RoadmapContent({ data }: { data: HomeDataTuple }) {
  const [feedbackList, currentUser] = data;

  const plannedFeedback = feedbackList.filter(
    (feedback) => feedback.status === "planned"
  );
  const inProgressFeedback = feedbackList.filter(
    (feedback) => feedback.status === "in-progress"
  );
  const liveFeedback = feedbackList.filter(
    (feedback) => feedback.status === "live"
  );

  const tabs = [
    {
      title: "Planned",
      description: "Ideas prioritized for research",
      count: plannedFeedback.length,
      feedbackList: plannedFeedback,
      status: "planned",
    },
    {
      title: "In-Progress",
      description: "Currently being developed",
      count: inProgressFeedback.length,
      feedbackList: inProgressFeedback,
      status: "in-progress",
    },
    {
      title: "Live",
      description: "Released features",
      count: liveFeedback.length,
      feedbackList: liveFeedback,
      status: "live",
    },
  ];

  return (
    <div className={styles.container}>
      <RoadmapHeader />
      <main className={styles.main}>
        <Tabs
          selectedTabClassName={styles.selectedTab}
          selectedTabPanelClassName={styles.selectedPanel}
        >
          <TabList className={styles.tabList}>
            {tabs.map((tab) => (
              <Tab
                key={tab.title}
                className={`${styles.tab} ${styles[tab.status]}`}
              >
                {tab.title} ({tab.count})
              </Tab>
            ))}
          </TabList>
          {tabs.map((tab) => (
            <TabPanel key={tab.title} className={styles.tabPanel}>
              <header>
                <h3>
                  {tab.title} ({tab.count})
                </h3>
                <p>{tab.description}</p>
              </header>
              <RoadmapFeedbackList
                feedbackList={tab.feedbackList}
                currentUser={currentUser}
              />
            </TabPanel>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

export default RoadmapPage;
