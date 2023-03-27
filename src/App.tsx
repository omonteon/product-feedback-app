import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootRoute from "./routes";
import FeedbackDetailsRoute from "./routes/feedback";
import FeedbackNewRoute from "./routes/feedback/new";
import FeedbackEditRoute from "./routes/feedback/edit";
import { action as deleteFeedbackAction } from "./routes/feedback/delete";
import RoadmapRoute from "./routes/roadmap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
  },
  {
    path: "/feedback/new",
    element: <FeedbackNewRoute />,
  },
  {
    path: "/feedback/:feedbackId",
    element: <FeedbackDetailsRoute />,
  },
  {
    path: "/feedback/edit/:feedbackId",
    element: <FeedbackEditRoute />,
  },
  {
    path: "/feedback/delete/:feedbackId",
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
