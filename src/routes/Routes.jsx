import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllContests from "../pages/AllContests/AllContests";
import ContestDetails from "../components/ContestDetails/ContestDetails";
import Events from "../pages/Events/Events";
import SuccessStories from "../pages/SuccessStories/SuccessStories";

import PrivateRoute from "./PrivateRoute";
import AddContest from "../pages/Dashboards/CreatorDashboard/AddContest/AddContest";
import MyContests from "../pages/Dashboards/CreatorDashboard/MyContests/MyContests";
import ContestSubmissions from "../pages/Dashboards/CreatorDashboard/ContestSubmissions/ContestSubmissions";
import EditContest from "../pages/Dashboards/CreatorDashboard/EditContest/EditContest";
import ManageContests from "../pages/Dashboards/AdminDashboard/ManageContests/ManageContests";
import ManageUsers from "../pages/Dashboards/AdminDashboard/ManageUsers/ManageUsers";
import DashboardLayout from "../Layouts/DashboardLayout";
import { ParticipatedContests } from "../pages/Dashboards/UserDashboard/ParticipatedContests/ParticipatedContests";
import { WinningContests } from "../pages/Dashboards/UserDashboard/WinningContests/WinningContests";
import { UserProfile } from "../pages/Dashboards/UserDashboard/UserProfile/UserProfile";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel/PaymentCancel";

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
        element: (
          <PrivateRoute>
            {" "}
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "contest/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "contest/payment-cancelled",
        Component: PaymentCancel,
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // user route

      {
        path: "participated-contests",
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

      // creator route

      {
        path: "add-contest",
        Component: AddContest,
      },
      {
        path: "my-contests",
        Component: MyContests,
      },
      {
        path: "submissions/:contestId",
        Component: ContestSubmissions,
      },
      {
        path: "edit-contest/:id",
        Component: EditContest,
      },

      // admin route

      {
        path: "users",
        Component: ManageUsers,
      },
      {
        path: "contests",
        Component: ManageContests,
      },
    ],
  },
]);
