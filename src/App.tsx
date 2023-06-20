import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootRoute, {
  loader as homeLoader,
  action as homeAction,
} from "./routes";
import FeedbackDetailsRoute, {
  loader as feedbackDetailsLoader,
  action as feedbackDetailsAction,
} from "./routes/feedback";
import FeedbackNewRoute, {
  action as feedbackNewAction,
} from "./routes/feedback/new";
import FeedbackEditRoute, {
  loader as feedbackEditLoader,
  action as feedbackEditAction,
} from "./routes/feedback/edit";
import { action as deleteFeedbackAction } from "./routes/feedback/delete";
import RoadmapRoute from "./routes/roadmap";
import dataJSON from "./data.json";

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data === null) {
      localStorage.setItem("data", JSON.stringify(dataJSON));
    }
    setDataLoaded(true);
  }, []);

  if (dataLoaded) {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <RootRoute />,
        loader: homeLoader,
        action: homeAction,
      },
      {
        path: "/feedback/new",
        element: <FeedbackNewRoute />,
        action: feedbackNewAction,
      },
      {
        path: "/feedback/:feedbackId",
        element: <FeedbackDetailsRoute />,
        loader: feedbackDetailsLoader,
        action: feedbackDetailsAction,
      },
      {
        path: "/feedback/:feedbackId/edit",
        element: <FeedbackEditRoute />,
        loader: feedbackEditLoader,
        action: feedbackEditAction,
      },
      {
        path: "/feedback/:feedbackId/delete",
        action: deleteFeedbackAction,
      },
      {
        path: "/roadmap",
        element: <RoadmapRoute />,
      },
    ]);

    return <RouterProvider router={router} />;
  }
  return <>Loading data...</>;
}

export default App;
