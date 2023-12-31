import { Link, Outlet, useNavigate } from "react-router-dom";
import { LayoutContainer } from "./style";
import UserProfile from "../modules/UserManagement/ProfileManagement/UserProfile";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { logout } from "./UserManagement/utils/logout";
import OrderNotification from "./StoreManagement/orderNotifications";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };
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

  return (
    <LayoutContainer>
      <nav id="LayoutWrapper">
        {/* 프로필 정보 */}
        <h1
          onClick={handleLogoClick}
          style={{ marginTop: "20px", marginLeft: "10px" }}
        >
          CampAndTent
        </h1>

        <UserProfile />
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
              {/* <li>
                <Link
                  to="PopularProduct"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 인기 상품</p>
                </Link>
              </li> */}
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
                  to="unanswered-reviews"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 리뷰 관리</p>
                </Link>
              </li>
              <li>
                <Link
                  to="InqueryManagement"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p> 문의 관리</p>
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
        <OrderNotification />
      </nav>
      <main style={{ width: "100%" }}>
        <Outlet />
      </main>
    </LayoutContainer>
  );
};

export default Layout;
