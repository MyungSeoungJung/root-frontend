import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Layout from "./modules/Layout";
import { StoreManagementRoutes } from "./modules/StoreManagement/routes";
import ResetStyle from "./styles/reset";

const App = () => {
  return (
    <BrowserRouter>
      <ResetStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          {StoreManagementRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
