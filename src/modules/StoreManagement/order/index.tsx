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
    return (
      <img
        width={60}
        height={60}
        src={`http://localhost:8080/product/files/${uuidFileName}`}
      />
    );
  }
}
const OrderManagement = () => {
  return (
    <TableContainer>
      <section>
        <div>
          <h1>주문 내역/관리</h1>
        </div>
        <div>
          <nav>
            <div onClick={() => "전체"}>전체</div>
            <div onClick={() => "판매중"}>수락</div>
            <div onClick={() => "숨김"}>거절</div>
            <div onClick={() => "숨김"}>대기</div>
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
                  <td>이미지</td>
                  <td>제품 이름</td>
                  <td>처리 상태</td>
                  <td>주문 요청시간</td>
                  <td>수락</td>
                  <td>거절</td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>
    </TableContainer>
  );
};
export default OrderManagement;
