import { Route } from "react-router-dom";
import ProductRegistration from "./ProductRegistration";
import InventoryManagement from "./InventoryManagement";

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
