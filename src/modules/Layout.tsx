import { Link, Outlet } from "react-router-dom";
import { LayoutContainer } from "./style";

const Layout = () => {
  return (
    <LayoutContainer>
      <nav>
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
              <Link to="storeManagement">주문처리</Link>
            </li>
            <li>
              <Link to="storeManagement">구매 이력관리</Link>
            </li>
            <li>
              <Link to="storeManagement">매출관리</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>고객 관리</p>
          <ul>
            <li>
              <Link to="storeManagement">고객 관리</Link>
            </li>
            <li>
              <Link to="ProfileRegister">프로필 등록</Link>
            </li>
            <li>
              <Link to="ReviewManagement">리뷰관리</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </LayoutContainer>
  );
};

export default Layout;
