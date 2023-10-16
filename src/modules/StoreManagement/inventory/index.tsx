import { useEffect, useState } from "react";
import { InventoryContainer } from "./style";
import http from "@/utils/http";
//file 따로 get 요청
// function MediaElement({
//   contentType,
//   uuidFileName,
// }: {
//   contentType: string;
//   uuidFileName: string;
// }) {
//   if (contentType.includes("image")) {
//     return (
//       <img
//         width={300}
//         src={`http://localhost:8080/posts/files/${uuidFileName}`}
//       />
//     );
//   } else {
//     return (
//       <video>
//         <source
//           src={`http://localhost:8080/posts/files/${uuidFileName}`}
//           type={contentType}
//         ></source>
//       </video>
//     );
//   }
// }
interface product {
  id: number;
  productBrand: String;
  productName: String;
  productPrice: String;
  isActive: String;
  category: String;
  productDescription: String;
}
interface productFile {
  contentType: string;
  originalFileName: String;
  uuidFileName: string;
}
const InventoryManagement = () => {
  const [product, setProduct] = useState<product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get<product[]>("/product/inventory"); // 수정: GET 요청으로 변경하고 데이터를 가져오기
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <InventoryContainer>
      <h1>재고관리</h1>
      <section>
        <div>
          <nav>
            <div>전체</div>
            <div>판매중</div>
            <div>숨김</div>
          </nav>
          <div>
            <div id="inputContainer">
              <div>
                <input placeholder="재고검색" />
              </div>
              <div>
                <button>검색</button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <td>No</td>
                  <td>이미지</td>
                  <td>이름:</td>
                  <td>판매가:</td>
                  <td>상태:</td>
                  <td>재고:</td>
                  <td>등록일:</td>
                </tr>
              </thead>
              <tbody>
                {product.map((product) => (
                  <tr key={`product-id-${product.id}`}>
                    <td>{product.productName}</td>
                    <td>{product.productName}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.isActive}</td>
                    <td>{product.category}</td>
                    <td>{product.productDescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </InventoryContainer>
  );
};
export default InventoryManagement;
