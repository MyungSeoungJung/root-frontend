import { Route } from "react-router-dom";
import ProfileManagement from "./ProfileManagement/ProfileRegister";
import ReviewManagement from "./ReviewManagement";
import ScheduleManagement from "./ScheduleManagement";
import ChartManagement from "./ChartManagement";
import SalesGraph from "../StoreManagement/salesStatus/SalesGraph";

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
  <Route key="SalesGraph" path="SalesGraph" element={<SalesGraph />} />,
];
