import { Route } from "react-router-dom";
import ProfileManagement from "./ProfileManagement/ProfileRegister";
import ScheduleManagement from "./ScheduleManagement";
import ChartManagement from "./ChartManagement";
import SalesGraph from "../StoreManagement/salesStatus/SalesGraph";
import UnansweredReviewTable from "./ReviewManagement/UnansweredReviewTable";
import AnsweredReviews from "./ReviewManagement/AnsweredReviewsTable";

export const UserManagementRoutes = [
  <Route
    key="ProfileManagement"
    path="ProfileManagement"
    element={<ProfileManagement />}
  />,
  <>
    <Route
      key="AnsweredReviews"
      path="answered"
      element={<AnsweredReviews />}
    />
    <Route
      key="UnansweredReviews"
      path="unanswered-reviews"
      element={<UnansweredReviewTable />}
    />
  </>,
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
  <Route key="SalesGraph" path="SalesGraph" element={<SalesGraph />} />,
];
