import { Route } from "react-router-dom";
import ProfileRegister from "./ProfileRegister";
import ReviewManagement from "./ReviewManagement";

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
];
