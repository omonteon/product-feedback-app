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

  console.log(data);

  const tabs = [
    {
      title: "Planned",
      description: "Ideas prioritized for research",
      count: 2,
    },
    {
      title: "In-Progress",
      description: "Currently being developed",
      count: 3,
    },
    { title: "Live", description: "Released features", count: 1 },
  ];

  return (
    <Suspense fallback={<>Fallback</>}>
      <Await resolve={data} errorElement={<p>Error loading home data</p>}>
        <div className={`${styles.container}`}>
          <RoadmapHeader />
          <main className={styles.main}>
            <Tabs
              selectedTabClassName={styles.selectedTab}
              selectedTabPanelClassName={styles.selectedPanel}
            >
              <TabList className={styles.tabList}>
                {tabs.map((tab) => (
                  <Tab key={tab.title}>
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
                  <RoadmapFeedbackList />
                </TabPanel>
              ))}
            </Tabs>
          </main>
        </div>
      </Await>
    </Suspense>
  );
}

export default RoadmapPage;
