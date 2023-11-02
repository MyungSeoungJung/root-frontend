import { Route } from "react-router-dom";
import ProfileManagement from "./ProfileManagement/ProfileRegister";
import ReviewManagement from "./ReviewManagement/reviewTable";
import ScheduleManagement from "./ScheduleManagement";
import ChartManagement from "./ChartManagement";

export const UserManagementRoutes = [
  <Route
    key="ProfileManagement"
    path="ProfileManagement"
    element={<ProfileManagement />}
  />,
  <Route
    key="ReviewManagement"
    path="ReviewManagement"
    element={<ReviewManagement />}
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
