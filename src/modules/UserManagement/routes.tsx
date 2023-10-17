import { Route } from "react-router-dom";
import ProfileRegister from "./ProfileManagement";
import ReviewManagement from "./ReviewManagement";
import ScheduleManagement from "./ScheduleManagement";

export const UserManagementRoutes = [
  <Route
    key="ProfileRegister"
    path="ProfileRegister"
    element={<ProfileRegister />}
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
];
