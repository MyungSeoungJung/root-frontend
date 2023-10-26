import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./modules/Layout";
import { StoreManagementRoutes } from "./modules/StoreManagement/routes";
import ResetStyle from "./styles/reset";
import { UserManagementRoutes } from "./modules/UserManagement/routes";
import LoginComponent from "./modules/UserManagement/LoginManagement/LoginComponent";
import { ProfileProvider } from "./modules/UserManagement/ProfileManagement/ProfileContext";

const App = () => {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <ResetStyle />
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/home" element={<Layout />}>
            {UserManagementRoutes}
            {StoreManagementRoutes}
          </Route>
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
};

export default App;
