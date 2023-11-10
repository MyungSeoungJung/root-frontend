import { Route } from "react-router-dom";
import ProfileManagement from "./ProfileManagement/ProfileRegister";
import ScheduleManagement from "./ScheduleManagement";
import ChartManagement from "./ChartManagement";
import SalesGraph from "../StoreManagement/salesStatus/SalesGraph";
import ReviewsContainer from "./ReviewManagement/reviewContainer";

export const UserManagementRoutes = [
  <Route
    key="ProfileManagement"
    path="ProfileManagement"
    element={<ProfileManagement />}
  />,
  // <Route key="AnsweredReviews" path="answered" element={<AnsweredReviews />} />,
  <Route
    key="UnansweredReviews"
    path="unanswered-reviews"
    element={<ReviewsContainer />}
  />,
  <Route
    key="ScheduleManagement"
    path="ScheduleManagement"
    element={<ScheduleManagement />}
  />,
  <Route
    key="ChartManagement"
    path="ChartManagement"
    element={<ChartManagement />}
  />,
];
