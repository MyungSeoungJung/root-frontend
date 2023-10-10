import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./modules/Layout";
import { StoreManagementRoutes } from "./modules/StoreManagement/routes";
import ResetStyle from "./styles/reset";
import { UserManagementRoutes } from "./modules/UserManagement/routes";

const App = () => {
  return (
    <BrowserRouter>
      <ResetStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          {UserManagementRoutes}
          {StoreManagementRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
