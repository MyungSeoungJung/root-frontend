import { useEffect, useRef, useState } from "react";
import http from "@/utils/http";
import { TableContainer } from "../inventory/Inventory/style"; //전체 틀 css
//file 따로 get 요청
function MediaElement({
  contentType,
  uuidFileName,
}: {
  contentType: string;
  uuidFileName: string;
}) {
  if (contentType.includes("image")) {
    console.log(`check ---------${uuidFileName}`);

    return (
      <img
        width={60}
        height={60}
        src={`http://localhost:8080/product/files/${uuidFileName}`}
      />
    );
  }
}
interface order {
  orderInfo: orderInfo[];
  orderState: orderState[];
  productFile: productFile[];
  productInfo: productInfo[];
}
interface orderInfo {
  orderId: number;
  quantity: number;
  orderDate: string;
}
interface orderState {
  orderState: string;
}
interface productInfo {
  productId: number;
  productName: string;
}
interface productFile {
  contentType: string;
  originalFileName: string;
  uuidFileName: string;
}

const OrderManagement = () => {
  const [order, setOrder] = useState<order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`/order/orderDetail`);
        setOrder(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <TableContainer>
      <section>
        <div>
          <h1>주문 내역/관리</h1>
        </div>
        <div>
          <nav>
            <div onClick={() => "전체"}>전체</div>
            <div onClick={() => "판매중"}>완료</div>
            <div onClick={() => "숨김"}>실패</div>
          </nav>
          <div>
            <div id="inputContainer">
              <div>
                <input placeholder="주문 검색" />
              </div>
              <div>
                <button>검색</button>
              </div>
              <div>
                <button>이전</button>
              </div>
              <div>
                <button>다음</button>
              </div>
              <div></div>
            </div>
            <table>
              <thead>
                <tr>
                  <td>주문 ID</td>
                  <td>제품넘버</td>
                  <td>제품 이름</td>
                  <td>제품 사진</td>
                  <td>처리 상태</td>
                  <td>주문 요청시간</td>
                </tr>
              </thead>
              <tbody>
                {order.map((order, index) => (
                  <tr key={`order-key${order.orderInfo[0].orderId},${index}`}>
                    <td>{order.orderInfo[0].orderId}</td>
                    <td>{order.productInfo[0].productId}</td>
                    <td>{order.productInfo[0].productName}</td>
                    <td>
                      {order.productFile && order.productFile.length > 0 && (
                        <MediaElement
                          uuidFileName={order.productFile[0].uuidFileName}
                          contentType={order.productFile[0].contentType}
                        />
                      )}
                    </td>
                    <td>{order.orderState[0].orderState}</td>
                    <td>{order.orderInfo[0].orderDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </TableContainer>
  );
};
export default OrderManagement;
