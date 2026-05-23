import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import User from "../Pages/Dashboard/User";
import PlatformFee from "../Pages/Dashboard/PlatformFee";
import Membership from "../Pages/Dashboard/Membership";
import Swap from "../Pages/Dashboard/Swap";
import WarningMessage from "../Pages/Dashboard/WarningMessage";
import Vendors from "../Pages/Dashboard/Vendors";
import SupportDispute from "../Pages/Dashboard/SupportDispute";
import Vendor from "../Pages/Dashboard/Vendor";
import UserProfile from "@/components/ui/Settings/UserProfile";
import AboutUs from "@/components/ui/Settings/AboutUs";
import Legal from "../Pages/Dashboard/Legal";
import Refund from "../Pages/Dashboard/Refund";
import Messages from "../Pages/Dashboard/Messages";
import ReputationTrust from "../Pages/Dashboard/ReputationTrust";
import ProtocolControls from "../Pages/Dashboard/ProtocolControls";
import SecurityFraud from "../Pages/Dashboard/SecurityFraud";
import ChatLogs from "../Pages/Dashboard/ChatLogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute>
      <Main />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/swappers-management",
        element: <Users />,
      },
      {
        path: "/platform-fee",
        element: <PlatformFee />,
      },
      {
        path: "/membership",
        element: <Membership />,
      },
      {
        path: "/swap",
        element: <Swap />,
      },
      {
        path: "/refund",
        element: <Refund />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/reputation-trust",
        element: <ReputationTrust />,
      },
      {
        path: "/protocol-controls",
        element: <ProtocolControls />,
      },
      {
        path: "/security-fraud",
        element: <SecurityFraud />,
      },
      {
        path: "/chat-logs",
        element: <ChatLogs />,
      },
      {
        path: "/warning-message",
        element: <WarningMessage />,
      },
      {
        path: "/swappers/profile/:id",
        element: <User />,
      },
      {
        path: "/staff-list",
        element: <Vendors />,
      },
      {
        path: "/staff/profile/:id",
        element: <Vendor />,
      },
      {
        path: "/personal-information",
        element: <UserProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "f-a-q",
        element: <SupportDispute />,
      },
      {
        path: "support-dispute",
        element: <SupportDispute />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "/privacy-policy",
        element: <Legal />,
      },
      {
        path: "/terms-and-condition",
        element: <Legal />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
