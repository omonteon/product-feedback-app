import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootRoute, {
  loader as homeLoader,
  action as homeAction,
} from "./routes";
import FeedbackDetailsRoute, {
  loader as feedbackDetailsLoader,
  action as feedbackDetailsAction,
} from "./routes/feedback";
import FeedbackNewRoute from "./routes/feedback/new";
import FeedbackEditRoute from "./routes/feedback/edit";
import { action as deleteFeedbackAction } from "./routes/feedback/delete";
import RoadmapRoute from "./routes/roadmap";

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
