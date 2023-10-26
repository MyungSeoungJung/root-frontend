import { Route } from "react-router-dom";
import ProductRegistration from "./registration";
import InventoryManagement from "./inventory/Inventory";
import OrderManagement from "./order";

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
  <Route
    key="OrderManagement"
    path="OrderManagement"
    element={<OrderManagement />}
  />,
];
