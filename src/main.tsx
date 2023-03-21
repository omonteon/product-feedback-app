import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootRoute from "./routes";
import FeedbackDetailsRoute from "./routes/feedback";
import FeedbackNewRoute from "./routes/feedback/New";
import FeedbackEditRoute from "./routes/feedback/Edit";
import { action as deleteFeedbackAction } from "./routes/feedback/delete";
import RoadmapRoute from "./routes/roadmap";
import "./index.css";

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
    path: "/feedback/details/:feedbackId",
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
