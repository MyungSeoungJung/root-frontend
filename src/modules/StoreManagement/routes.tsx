import { Route } from "react-router-dom";
import ProductRegistration from "./registration";
import InventoryManagement from "./inventory";

export const StoreManagementRoutes = [
  <Route
    key="ProductRegistration"
    path="ProductRegistration"
    element={<ProductRegistration />}
  />,
  <Route
    key="InventoryManagement"
    path="InventoryManagement"
    element={<InventoryManagement />}
  />,
];
