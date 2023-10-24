import { useEffect, useRef, useState } from "react";
import { TableContainer } from "./style";
import http from "@/utils/http";

interface product {
  id: number;
  productBrand: string;
  productName: string;
  productPrice: string;
  isActive: string;
  category: string;
  productDescription: string;
  files: productFile[];
  productInfo: productInfo[];
}
interface productFile {
  contentType: string;
  originalFileName: string;
  uuidFileName: string;
}
interface productInfo {
  quantity: string;
  lastUpdated: string;
}
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

const InventoryManagement = () => {
  const [product, setProduct] = useState<product[]>([]);
  const [productState, setProductState] = useState<"">();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const size = 3; //사이즈 조절

  //  첫화면 get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(
          `/product/inventory?state=${productState}&size=${size}&page=${page}`
        );
        setProduct(response.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleGetProductState = async (state) => {
    setPage(0);
    let queryParams;

    if (state === "전체") {
      queryParams = "";
    } else if (state === "판매중") {
      queryParams = "true";
    } else if (state === "숨김") {
      queryParams = "false";
    }

    const response = await http.get(
      `/product/inventory?state=${queryParams}&size=${size}&page=0`
    );
    setProduct(response.data.content);
    setProductState(queryParams);
    // setProduct(prevProduct => [...prevProduct, ...response.data]); 기존에 있던 데이터
  };

  const handleNextPage = async () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      const response = await http.get(
        `/product/inventory?state=${productState}&size=${size}&page=${page + 1}`
      );
      setProduct(response.data.content);
      setPage(nextPage);
    }
  };

  const handlePrevPage = async () => {
    if (page == 1) {
      const prevPage = page - 1;
      const response = await http.get(
        `/product/inventory?state=${productState}&size=${size}&page=${page - 1}`
      );
      setProduct(response.data.content);
      setPage(prevPage);
    }
  };
  const inputRef = useRef<HTMLInputElement>();

  const handleSearchProduct = async () => {
    const response = await http.get(
      `product/inventory?state=${productState}&size=${size}&page=${page}&keyword=${inputRef.current.value}`
    );
    setProduct(response.data.content);
    console.log(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <TableContainer>
      <section>
        <div>
          <h1>재고 관리</h1>
        </div>
        <div>
          <nav>
            <div onClick={() => handleGetProductState("전체")}>전체</div>
            <div onClick={() => handleGetProductState("판매중")}>판매중</div>
            <div onClick={() => handleGetProductState("숨김")}>숨김</div>
          </nav>
          <div>
            <div id="inputContainer">
              <div>
                <input placeholder="재고검색" ref={inputRef} />
              </div>
              <div>
                <button onClick={handleSearchProduct}>검색</button>
              </div>
              <div>
                <button onClick={handlePrevPage} disabled={page === 0}>
                  이전
                </button>
              </div>
              <div>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                  다음
                </button>
              </div>
              <div></div>
            </div>
            <table>
              <thead>
                <tr>
                  <td>No</td>
                  <td>이미지</td>
                  <td>이름</td>
                  <td>판매가</td>
                  <td>상태</td>
                  <td>카테고리</td>
                  <td>재고</td>
                  <td>등록일</td>
                  <td>수정</td>
                </tr>
              </thead>
              <tbody>
                {product.map((product) => (
                  <tr key={`product-id-${product.id}`}>
                    <td>{product.id}</td>
                    <td>
                      {product.files.length > 0 && (
                        <MediaElement
                          uuidFileName={product.files[0].uuidFileName}
                          contentType={product.files[0].contentType}
                        />
                      )}
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.productPrice}원</td>
                    <td>
                      {product.isActive ? (
                        <span>판매중</span>
                      ) : (
                        <span>숨김</span>
                      )}
                    </td>
                    <td>{product.category}</td>
                    <td>{product.productInfo[0].quantity}</td>
                    <td>
                      {new Date(
                        product.productInfo[0].lastUpdated
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <button>수정</button>
                    </td>
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
export default InventoryManagement;
