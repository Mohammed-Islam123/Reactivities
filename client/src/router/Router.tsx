import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import ActivitiesDashboard from "../components/features/Dashboard/ActivitiesDashboard";
import ActivityForm from "../components/features/Dashboard/ActivityForm";
import ActivityDetails from "../components/features/Dashboard/ActivityDetails";
import TestErrors from "../components/features/Errors/TestErrors";
import NotFound from "../components/features/Errors/NotFound";
import LoginForm from "../components/features/Auth/LoginForm";
import RegisterForm from "../components/features/Auth/RegisterForm";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "activities",
        element: <ActivitiesDashboard />,
      },
      {
        path: "activities/:id",
        element: <ActivityDetails />,
      },
      {
        path: "activities/edit/:id",
        element: <ActivityForm key={"edit"} />,
      },
      {
        path: "createActivity",
        element: <ActivityForm key={"create"} />,
      },
      {
        path: "errors",
        element: <TestErrors />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
export const router = createBrowserRouter(routes);
