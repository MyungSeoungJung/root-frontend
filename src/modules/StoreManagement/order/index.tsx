import { useEffect, useRef, useState } from "react";
import http from "@/modules/StoreManagement/utils/http";
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
  orderId: number;
  quantity: number;
  orderDate: string;
  orderState: string;
  productInfo: productInfo[];
}

interface productInfo {
  productId: number;
  productName: string;
  contentType: string;
  originalFileName: string;
  uuidFileName: string;
}

const OrderManagement = () => {
  const [order, setOrder] = useState<order[]>([]);
  const [orderState, setOrderState] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPage] = useState(1);
  const size = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(
          `/order/orderDetail?state=${orderState}&size=${size}&page=${page}`
        );
        setOrder(response.data.content);
        setTotalPage(response.data.totalPages);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleGetOrderState = async (state) => {
    setPage(0);
    let queryParams;

    if (state === "전체") {
      queryParams = "";
    } else if (state === "완료") {
      queryParams = "true";
    } else if (state === "실패") {
      queryParams = "false";
    }

    const response = await http.get(
      `/order/orderDetail?state=${queryParams}&size=${size}&page=0`
    );
    setOrder(response.data.content);
    setOrderState(queryParams);
  };

  const handleNextPage = async () => {
    if (page < totalPages - 1) {
      const nextPage = page + 1;
      const response = await http.get(
        `/order/orderDetail?state=${orderState}&size=${size}&page=${page + 1}`
      );
      setOrder(response.data.content);
      setPage(nextPage);
    }
  };
  const handlePrevPage = async () => {
    if (page > 0) {
      const PrevPage = page - 1;
      const response = await http.get(
        `/order/orderDetail?state=${orderState}&size=${size}&page=${page - 1}`
      );
      setOrder(response.data.content);
      setPage(PrevPage);
    }
  };

  const inputRef = useRef<HTMLInputElement>();

  const handleSearchOrder = async () => {
    const response = await http.get(
      `order/orderDetail?state=${orderState}&size=${size}&page=${page}&keyword=${inputRef.current.value}`
    );
    setOrder(response.data.content);
    console.log(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <TableContainer>
      <section>
        <div>
          <h1>주문 내역/관리</h1>
        </div>
        <div>
          <nav>
            <div onClick={() => handleGetOrderState("전체")}>전체</div>
            <div onClick={() => handleGetOrderState("완료")}>처리 완료</div>
            <div onClick={() => handleGetOrderState("실패")}>처리 실패</div>
          </nav>
          <div>
            <div id="inputContainer">
              <div>
                <input placeholder="주문Id로 검색해주세요" ref={inputRef} />
              </div>
              <div>
                <button onClick={handleSearchOrder}>검색</button>
              </div>
              <div>
                <button onClick={handlePrevPage}>이전</button>
              </div>
              <div>
                <button onClick={handleNextPage}>다음</button>
              </div>
              <div></div>
            </div>
            <table>
              <thead>
                <tr>
                  <td>주문 ID</td>
                  <td>제품넘버</td>
                  <td>제품 사진</td>
                  <td>제품 이름</td>
                  <td>처리 상태</td>
                  <td>주문 요청시간</td>
                </tr>
              </thead>
              <tbody>
                {order.map((order, index) => (
                  <tr key={`order-key${order.orderId},${index}`}>
                    <td>{order.orderId}</td>
                    <td>{order.productInfo[0].productId}</td>
                    <td>
                      {order.productInfo && order.productInfo.length > 0 && (
                        <MediaElement
                          uuidFileName={order.productInfo[0].uuidFileName}
                          contentType={order.productInfo[0].contentType}
                        />
                      )}
                    </td>
                    <td>{order.productInfo[0].productName}</td>
                    <td>
                      {order.orderState ? (
                        <span>처리 완료</span>
                      ) : (
                        <span>처리 실패</span>
                      )}
                    </td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
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
