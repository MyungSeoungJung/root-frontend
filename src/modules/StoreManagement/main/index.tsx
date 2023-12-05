import { useEffect, useState } from "react";
import SettlementMoney from "../salesStatus/SettlementMoney";
import { MainPageContainer } from "./style";
import http from "../utils/http";
import SalesChart from "../salesStatus/SalesChart";
import ApexChart from "@/modules/UserManagement/ChartManagement";
import SalesChartComponet from "../salesStatus/ComponentChart";
import SalesGraphComponent from "../salesStatus/ComponentGraph";

interface order {
  successOrderCount: string;
  failureOrderCount: string;
}
interface product {
  ProductIsActiveTrue: string;
  ProductIsActiveFalse: string;
  ProductDisCountActive: string;
}

const Main = () => {
  const [orderStatusSum, SetorderStatusSum] = useState({
    successOrderCount: "0",
    failureOrderCount: "0",
  });
  const [productStatusSum, SetproductStatusSum] = useState({
    ProductIsActiveTrue: "0",
    ProductIsActiveFalse: "0",
    ProductDisCountActive: "0",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`/order/orderProcessingStatus`);
        SetorderStatusSum(response.data);
        console.log(response.data);

        const productResponse = await http.get(`/product/currentProductState`);
        SetproductStatusSum(productResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <MainPageContainer>
      <div></div>
      <SettlementMoney />
      {/* 컨테이너 */}
      <div>
        {/* 주문 현황 */}
        <div>
          <div>
            <p>월간 주문 현황</p>
          </div>
          <div>
            <div>
              <p> 성공</p>
              <div>
                <strong>{orderStatusSum.successOrderCount}</strong>건
              </div>
            </div>
            <div>
              <p> 실패</p>
              <div>
                <strong>{orderStatusSum.failureOrderCount}</strong>건
              </div>
            </div>
          </div>
        </div>

        {/* 제품 현황 */}
        <div>
          <div>
            <p>제품 현황</p>
          </div>
          <div>
            <div>
              <p> 판매</p>
              <div>
                <strong>{productStatusSum.ProductIsActiveTrue}</strong>건
              </div>
            </div>
            <div>
              <p> 숨김</p>
              <div>
                <strong>{productStatusSum.ProductIsActiveFalse}</strong>건
              </div>
            </div>
            <div>
              <p> 할인</p>
              <div>
                <strong>{productStatusSum.ProductDisCountActive}</strong>건
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "84%",
        }}
      >
        <SalesChartComponet />
        <SalesGraphComponent />
      </div>
    </MainPageContainer>
  );
};

export default Main;
