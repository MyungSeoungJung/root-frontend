import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./modules/Layout";
import { StoreManagementRoutes } from "./modules/StoreManagement/routes";
import ResetStyle from "./styles/reset";
import { UserManagementRoutes } from "./modules/UserManagement/routes";
import LoginComponent from "./modules/UserManagement/LoginManagement/LoginComponent";
import { ProfileProvider } from "./modules/UserManagement/ProfileManagement/ProfileContext";
import { ReviewProvider } from "./modules/UserManagement/ReviewManagement/reviewContext";
import OrderNotification from "./modules/StoreManagement/orderNotifications";

const App = () => {
  return (
    <ProfileProvider>
      <ReviewProvider>
        <BrowserRouter>
          <OrderNotification />
          <ResetStyle />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/home" element={<Layout />}>
              {UserManagementRoutes}
              {StoreManagementRoutes}
            </Route>
          </Routes>
        </BrowserRouter>
      </ReviewProvider>
    </ProfileProvider>
  );
};

export default App;
