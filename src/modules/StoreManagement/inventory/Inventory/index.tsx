import { useEffect, useRef, useState } from "react";
import { TableContainer } from "./style";
import http from "@/modules/StoreManagement/utils/http";
import InventoryModifyModal from "../InventoryModifyModal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faBell } from "@fortawesome/free-solid-svg-icons";

interface product {
  id: number;
  productBrand: string;
  productName: string;
  productPrice: string;
  isActive: boolean;
  category: string;
  productDescription: string;
  maximumPurchaseQuantity: string;
  discountRate: string;
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
        src={`http://192.168.100.151:8080/product/files/${uuidFileName}`}
      />
    );
  }
}

const InventoryManagement = () => {
  const [product, setProduct] = useState<product[]>([]);
  const [productState, setProductState] = useState<"">();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [modifyItem, setModifyItem] = useState({
    index: 0,
    isActive: false,
    category: "",
    productName: "",
    quantity: "",
    productPrice: "",
    maximumPurchaseQuantity: "",
    discountRate: "",
  });
  const [showModifyModal, SetShowModifyModal] = useState(false);
  const [productToOrder, setproductToOrder] = useState<product[]>([]);
  const [showProductToOrder, setShowProductToOrder] = useState(false);

  const size = 5; //사이즈 조절

  //  첫화면 get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(
          `/product/inventory?state=${productState}&size=${size}&page=${page}`
        );
        setProduct(response.data.content);
        setTotalPages(response.data.totalPages);
        // 서버에서 받을때 제품 수량이 5개 이하인 제품 alert뜨게
        const productsLowQuantity = response.data.content.filter(
          (product) => parseInt(product.productInfo[0].quantity) <= 10
        );
        productsLowQuantity.forEach((product) => {
          setproductToOrder(productsLowQuantity);
        }); // productsLowQuantity
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
    } else if (state == "할인") {
      queryParams = "할인";
    }

    const response = await http.get(
      `/product/inventory?state=${queryParams}&size=${size}&page=0`
    );
    setProduct(response.data.content);
    setProductState(queryParams);
    // setProduct(prevProduct => [...prevProduct, ...response.data]); 기존에 있던 데이터
  };

  const handleNextPage = async () => {
    if (page < totalPages - 1) {
      const nextPage = page + 1;
      const response = await http.get(
        `/product/inventory?state=${productState}&size=${size}&page=${page + 1}`
      );
      setProduct(response.data.content);
      setPage(nextPage);
    }
  };

  const handlePrevPage = async () => {
    if (page > 0) {
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
  // -------------------------------------모달 ------------------------------
  // 모달 열기
  const handleOpenModifyModal = (index: number) => {
    SetShowModifyModal(true);
    setModifyItem({
      index,
      productName: product[index].productName,
      category: product[index].category,
      quantity: product[index].productInfo[0].quantity,
      isActive: product[index].isActive,
      productPrice: product[index].productPrice,
      maximumPurchaseQuantity: product[index].maximumPurchaseQuantity,
      discountRate: product[index].discountRate,
    });
  };
  //  모달 수정 확인 서버 보내기
  const handleModifyConfirm = ({
    index,
    isActive,
    category,
    productName,
    quantity,
    productPrice,
    maximumPurchaseQuantity,
    discountRate,
  }: {
    index: number;
    isActive: boolean;
    category: string;
    productName: string;
    quantity: string;
    productPrice: string;
    maximumPurchaseQuantity: string;
    discountRate: string;
  }) => {
    (async () => {
      const response = await http.put(
        `/product/modifyProduct?id=${product[index].id}`,
        {
          isActive,
          category,
          productName,
          quantity,
          productPrice,
          maximumPurchaseQuantity,
          discountRate,
        }
      );
      console.log(response + "response");
      setProduct(
        product.map((item, idx) => {
          if (index === idx) {
            return {
              ...item,
              isActive,
              category,
              productName,
              productInfo: [
                {
                  quantity,
                  lastUpdated: item.productInfo[0].lastUpdated,
                },
              ],
              productPrice,
              maximumPurchaseQuantity,
              discountRate,
            };
          }
          return item;
        })
      );
      SetShowModifyModal(false);
    })();
  };
  // 모달 취소 버튼
  const handleModifyCancle = () => {
    SetShowModifyModal(false);
  };
  // 발주 목록 알림창
  const handleProductAlertCancle = () => {
    setShowProductToOrder(false);
  };
  // 발주 목록 알림창
  const handleProductAlertConfirm = () => {
    setShowProductToOrder(true);
  };
  return (
    <TableContainer>
      <section>
        <div>
          <div>
            <h1>재고 관리</h1>
          </div>
          <div style={{ marginRight: "20px" }}>
            <FontAwesomeIcon
              icon={faBell}
              id="fabell-icon"
              onClick={handleProductAlertConfirm}
            />
          </div>
        </div>
        {showProductToOrder && (
          <aside>
            <div></div>
            <div>
              <div>
                <div style={{ display: "flex", flex: "1" }}></div>
                <div style={{ display: "flex", flex: "1", fontSize: "0.9rem" }}>
                  <p>발주 목록</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: "1",
                    justifyContent: "end",
                    marginRight: "10px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faX}
                    id="x-box-icon"
                    onClick={handleProductAlertCancle}
                  />
                </div>
              </div>

              <div>
                {productToOrder.length > 0 && (
                  <table>
                    <tbody>
                      {productToOrder.map((orderedProduct, index) => (
                        <tr key={index}>
                          <td>이름: {orderedProduct.productName}</td>
                          <td>
                            재고: {orderedProduct.productInfo[0].quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div></div>
          </aside>
        )}
        <div>
          <nav>
            <div onClick={() => handleGetProductState("전체")}>전체</div>
            <div onClick={() => handleGetProductState("판매중")}>판매중</div>
            <div onClick={() => handleGetProductState("숨김")}>숨김</div>
            <div onClick={() => handleGetProductState("할인")}>할인중</div>
          </nav>
          <div>
            <div id="inputContainer">
              <div>
                <input
                  placeholder="재품 이름으로 검색해주세요"
                  ref={inputRef}
                />
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
                  <td>최대 주문 수량</td>
                  <td>할인</td>
                  <td>등록일</td>
                  <td>수정</td>
                </tr>
              </thead>
              <tbody>
                {product.map((product, idx) => (
                  <tr key={`product-id-${product.id},${idx}`}>
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
                    <td>{product.maximumPurchaseQuantity}</td>
                    <td>{product.discountRate}</td>
                    <td>
                      {new Date(
                        product.productInfo[0].lastUpdated
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleOpenModifyModal(idx);
                        }}
                      >
                        수정
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showModifyModal && (
          <InventoryModifyModal
            index={modifyItem.index}
            isActive={modifyItem.isActive}
            category={modifyItem.category}
            productName={modifyItem.productName}
            quantity={modifyItem.quantity}
            productPrice={modifyItem.productPrice}
            maximumPurchaseQuantity={modifyItem.maximumPurchaseQuantity}
            discountRate={modifyItem.discountRate}
            onConfirm={handleModifyConfirm}
            onCancel={handleModifyCancle}
          ></InventoryModifyModal>
        )}
        {/* {showProductToOrder && (
          <aside>
            <div>
              <div>
                <div style={{ display: "flex", flex: "1" }}></div>
                <div style={{ display: "flex", flex: "1", fontSize: "0.9rem" }}>
                  <p>발주 목록</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flex: "1",
                    justifyContent: "end",
                    marginRight: "10px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faX}
                    id="x-box-icon"
                    onClick={handleProductAlertCancle}
                  />
                </div>
              </div>

              <div>
                {productToOrder.length > 0 && (
                  <table>
                    <tbody>
                      {productToOrder.map((orderedProduct, index) => (
                        <tr key={index}>
                          <td>이름: {orderedProduct.productName}</td>
                          <td>
                            재고: {orderedProduct.productInfo[0].quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </aside>
        )} */}
      </section>
    </TableContainer>
  );
};
export default InventoryManagement;
