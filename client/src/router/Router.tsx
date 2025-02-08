import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import ActivitiesDashboard from "../components/layout/Dashboard/ActivitiesDashboard";
import ActivityForm from "../components/layout/Dashboard/ActivityForm";
import ActivityDetails from "../components/layout/Dashboard/ActivityDetails";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "activities",
        element: <ActivitiesDashboard />,
      },
      {
        path: "activities/:id",
        element: <ActivityDetails />,
      },
      {
        path: "activities/:id/edit",
        element: <ActivityForm key={"edit"} />,
      },
      {
        path: "createActivity",
        element: <ActivityForm key={"create"} />,
      },
    ],
  },
];
export const router = createBrowserRouter(routes);
