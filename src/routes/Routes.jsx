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
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Blog from "../pages/Blog/Blog";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";

import PrivateRoute from "./PrivateRoute";
import AddContest from "../pages/Dashboards/CreatorDashboard/AddContest/AddContest";
import MyContests from "../pages/Dashboards/CreatorDashboard/MyContests/MyContests";
import ContestSubmissions from "../pages/Dashboards/CreatorDashboard/ContestSubmissions/ContestSubmissions";
import EditContest from "../pages/Dashboards/CreatorDashboard/EditContest/EditContest";
import ManageContests from "../pages/Dashboards/AdminDashboard/ManageContests/ManageContests";
import ManageUsers from "../pages/Dashboards/AdminDashboard/ManageUsers/ManageUsers";
import ManageReviews from "../pages/Dashboards/AdminDashboard/ManageReviews/ManageReviews";
import DashboardLayout from "../Layouts/DashboardLayout";
import { ParticipatedContests } from "../pages/Dashboards/UserDashboard/ParticipatedContests/ParticipatedContests";
import { WinningContests } from "../pages/Dashboards/UserDashboard/WinningContests/WinningContests";
import { UserProfile } from "../pages/Dashboards/UserDashboard/UserProfile/UserProfile";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel/PaymentCancel";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import CreatorRoute from "./CreatorRoute";

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
        path: "/leader-board",
        Component: Leaderboard,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/blog",
        Component: Blog,
      },
      {
        path: "/privacy",
        Component: PrivacyPolicy,
      },
      {
        path: "/contest/:id",
        Component: ContestDetails,
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
        // Component: ParticipatedContests,
        element: (
          <UserRoute>
            {" "}
            <ParticipatedContests />
          </UserRoute>
        ),
      },
      {
        path: "winning",
        // Component: WinningContests,
        element: (
          <UserRoute>
            <WinningContests />
          </UserRoute>
        ),
      },
      {
        path: "profile",
        // Component: UserProfile,
        element: (
          <UserRoute>
            {" "}
            <UserProfile />
          </UserRoute>
        ),
      },

      // creator route

      {
        path: "add-contest",
        // Component: AddContest,
        element: (
          <CreatorRoute>
            {" "}
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "my-contests",
        // Component: MyContests,
        element: (
          <CreatorRoute>
            {" "}
            <MyContests />
          </CreatorRoute>
        ),
      },
      {
        path: "submissions/:contestId",
        // Component: ContestSubmissions,
        element: (
          <CreatorRoute>
            <ContestSubmissions />
          </CreatorRoute>
        ),
      },
      {
        path: "edit-contest/:id",
        // Component: EditContest,
        element: (
          <CreatorRoute>
            <EditContest />
          </CreatorRoute>
        ),
      },

      // admin route

      {
        path: "users",
        // Component: ManageUsers,
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "contests",
        // Component: ManageContests,
        element: (
          <AdminRoute>
            <ManageContests />
          </AdminRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
    ],
  },
]);
