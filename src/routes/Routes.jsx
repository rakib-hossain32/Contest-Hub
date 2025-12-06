import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllContests from "../pages/AllContests/AllContests";
import ContestDetails from "../components/ContestDetails/ContestDetails";
import Events from "../pages/Events/Events";
import SuccessStories from "../pages/SuccessStories/SuccessStories";
import DashboardLayout from "../Root/DashboardLayout";
import { ParticipatedContests } from "../pages/Dashboards/ParticipatedContests/ParticipatedContests";
import { WinningContests } from "../pages/Dashboards/WinningContests/WinningContests";
import { UserProfile } from "../pages/Dashboards/UserProfile/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/all-contests",
        Component: AllContests,
      },
      {
        path: "/events",
        Component: Events,
      },
      {
        path: "/success-stories",
        Component: SuccessStories,
      },
      {
        path: "/contest/:id",
        Component: ContestDetails,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "participated",
        Component: ParticipatedContests,
      },
      {
        path: "winning",
        Component: WinningContests,
      },
      {
        path: "profile",
        Component: UserProfile,
      },
    ],
  },
]);
