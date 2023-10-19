import { Link, Outlet } from "react-router-dom";
import { LayoutContainer } from "./style";
import UserProfile from "../modules/UserManagement/ProfileManagement/ProfileContext";

const Layout = () => {
  return (
    <LayoutContainer>
      <nav id="LayoutWrapper">
        <div>
          <h1>CampAndTent Service</h1>
          <UserProfile />
        </div>
        <div>
          <p>가게 관리</p>
          <ul>
            <li>
              <Link to="ProductRegistration">상품등록</Link>
            </li>
            <li>
              <Link to="InventoryManagement">재고관리</Link>
            </li>
            <li>
              <Link to="">주문처리</Link>
            </li>
            <li>
              <Link to="">구매 이력관리</Link>
            </li>
            <li>
              <Link to="">매출관리</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>고객 관리</p>
          <ul>
            <li>
              <Link to="">고객 관리</Link>
            </li>
            <li>
              <Link to="ProfileManagement">프로필 등록</Link>
            </li>
            <li>
              <Link to="ReviewManagement">리뷰관리</Link>
            </li>
            <li>
              <Link to="ScheduleManagement">캘린더</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main style={{ width: "100%" }}>
        <Outlet />
      </main>
    </LayoutContainer>
  );
};

export default Layout;
