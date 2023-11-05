import { Link, Outlet } from "react-router-dom";
import { LayoutContainer } from "./style";
import UserProfile from "../modules/UserManagement/ProfileManagement/UserProfile";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../modules/UserManagement/utils/logout";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [showStoreManagementNav, setShowStoreManagementNav] = useState(false);
  const handleshowStoreManagementNav = () => {
    // 가게관리 토글
    setShowStoreManagementNav(!showStoreManagementNav);
  };

  const [showUserManagementNav, setshowUserManagementNav] = useState(false);
  const handleshowUserManagementNav = () => {
    // 가게관리 토글
    setshowUserManagementNav(!showUserManagementNav);
  };
  const navigate = useNavigate();

  // 로그아웃 버튼의 클릭 이벤트 핸들러
  const handleLogoutClick = () => {
    logout(navigate); // navigate 함수를 logout에 전달
  };
  return (
    <LayoutContainer>
      <nav id="LayoutWrapper">
        {/* 프로필 정보 */}
        <div>
          <h1>CampAndTent</h1>
          <UserProfile />
        </div>
        {/*  가게 관리 ul */}
        <div>
          <div>
            <h2 onClick={handleshowStoreManagementNav}>
              <FontAwesomeIcon icon={faStore} />
              &nbsp;&nbsp;가게 관리
            </h2>
          </div>
          {showStoreManagementNav && (
            <ul>
              <li>
                <Link
                  to="ProductRegistration"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p>상품등록</p>
                </Link>
              </li>
              <li>
                <Link
                  to="InventoryManagement"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 재고관리</p>
                </Link>
              </li>
              <li>
                <Link
                  to="OrderManagement"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 주문처리</p>
                </Link>
              </li>
              <li>
                <Link
                  to="SalesChart"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 판매 현황</p>
                </Link>
              </li>
              <li>
                <Link
                  to="SalesGraph"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 매출관리</p>
                </Link>
              </li>
              <li>
                <Link
                  to="PopularProduct"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 인기 상품</p>
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* 고객 관리 ul */}
        <div>
          <div>
            <h2 onClick={handleshowUserManagementNav}>
              <FontAwesomeIcon icon={faPeopleRoof} /> &nbsp;고객 관리
            </h2>
          </div>
          {showUserManagementNav && (
            <ul>
              <li>
                <Link to="" style={{ textDecoration: "none", color: "white" }}>
                  <p> 고객 관리</p>
                </Link>
              </li>
              <li>
                <Link
                  to="ChartManagement"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 고객 주문 통계</p>
                </Link>
              </li>
              <li>
                <Link
                  to="ProfileManagement"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 프로필 등록</p>
                </Link>
              </li>
              <li>
                <Link
                  to="ReviewManagement"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 리뷰관리</p>
                </Link>
              </li>
              <li>
                <Link
                  to="ScheduleManagement"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p>캘린더</p>
                </Link>
              </li>
            </ul>
          )}
        </div>
        <button onClick={handleLogoutClick}>로그아웃</button>
      </nav>
      <main style={{ width: "100%" }}>
        <Outlet />
      </main>
    </LayoutContainer>
  );
};

export default Layout;
