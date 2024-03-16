import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import RoadmapHeader from "@components/RoadmapHeader";
import styles from "./roadmap.module.css";

function RoadmapPage() {
  return (
    <div className={`${styles.container}`}>
      <RoadmapHeader />
      <main className={styles.main}>
        <Tabs selectedTabClassName={styles.selectedTab}>
          <TabList className={styles.tabList}>
            <Tab>Planned (2)</Tab>
            <Tab>In-Progress (3)</Tab>
            <Tab>Live (1)</Tab>
          </TabList>
          <TabPanel>
            <header>
              <h2>Planned (2)</h2>
              <p>Ideas prioritized for research</p>
            </header>
          </TabPanel>
          <TabPanel>
            <header>
              <h2>In-Progress (3)</h2>
              <p>Currently being developed</p>
            </header>
          </TabPanel>
          <TabPanel>
            <header>
              <h2>Live (1)</h2>
              <p>Released features</p>
            </header>
          </TabPanel>
        </Tabs>
      </main>
    </div>
  );
}

export default RoadmapPage;
