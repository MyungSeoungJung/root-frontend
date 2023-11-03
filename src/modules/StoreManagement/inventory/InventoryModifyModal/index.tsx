import { useRef } from "react";
import { ModifyModal } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface ModifyModalProps {
  index: number;
  isActive: boolean;
  category: string;
  productName: string;
  quantity: string;
  productPrice: string;
  maximumPurchaseQuantity: string;
  discountRate: string;
  onConfirm: (payload: {
    index: number;
    isActive: boolean;
    category: string;
    productName: string;
    quantity: string;
    productPrice: string;
    maximumPurchaseQuantity: string;
    discountRate: string;
  }) => void;
  onCancel: () => void;
}

const InventoryModifyModal = ({
  index,
  isActive,
  category,
  productName,
  quantity,
  productPrice,
  maximumPurchaseQuantity,
  discountRate,
  onConfirm,
  onCancel,
}: ModifyModalProps) => {
  const activeRef = useRef<HTMLSelectElement>();
  const productNameRef = useRef<HTMLInputElement>();
  const quantityRef = useRef<HTMLInputElement>();
  const productPriceRef = useRef<HTMLInputElement>();
  const maximumPurchaseQuantityRef = useRef<HTMLInputElement>();
  const categoryRef = useRef<HTMLSelectElement>();
  const discountRateRef = useRef<HTMLInputElement>();
  const handleConfirm = () => {
    onConfirm({
      index,
      isActive: activeRef.current.value === "true",
      productName: productNameRef.current.value,
      category: categoryRef.current.value,
      quantity: quantityRef.current.value,
      productPrice: productPriceRef.current.value,
      maximumPurchaseQuantity: maximumPurchaseQuantityRef.current.value,
      discountRate: discountRateRef.current.value,
    });
  };
  return (
    <ModifyModal>
      <div>
        <div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "30px",
                flex: "1",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "30px",
                  flex: "1",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "30px",
                  flex: "1",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "30px",
                  flex: "1",
                  justifyContent: "end",
                  marginRight: "10px",
                  fontSize: "14px",
                }}
              >
                <FontAwesomeIcon
                  icon={faX}
                  id="x-box-icon_modify_modal_box"
                  onClick={onCancel}
                />
              </div>
            </div>
            <div>
              <h1>재고 수정</h1>
            </div>

            <div>
              <select ref={activeRef}>
                <option>수정 할 상품의 상태를 선택해주세요</option>
                <option value="true">판매</option>
                <option value="false">숨김</option>
              </select>
            </div>
            <div>
              <select ref={categoryRef}>
                <option value="null" selected disabled hidden>
                  상품의 카테고리를 선택해주세요
                </option>
                <option value="tent">텐트</option>
                <option value="table">테이블</option>
                <option value="accessory">악세서리</option>
                <option value="tableware">식기류</option>
                <option value="other">기타</option>
              </select>
            </div>
            <table>
              <tr>
                <td>제품 이름</td>
                <td>
                  <input defaultValue={productName} ref={productNameRef} />{" "}
                </td>
              </tr>
              <tr>
                <td>제품 수량</td>
                <td>
                  <input defaultValue={quantity} ref={quantityRef} />
                </td>
              </tr>
              <tr>
                <td>제품 가격</td>
                <td>
                  <input defaultValue={productPrice} ref={productPriceRef} />
                </td>
              </tr>
              <tr>
                <td>주문 최대 수량</td>
                <td>
                  <input
                    defaultValue={maximumPurchaseQuantity}
                    ref={maximumPurchaseQuantityRef}
                  />
                </td>
              </tr>
              <tr>
                <td>할인률</td>
                <td>
                  <input defaultValue={discountRate} ref={discountRateRef} />
                </td>
              </tr>
            </table>
            <div>
              <button onClick={handleConfirm}>수정</button>{" "}
            </div>
          </div>
        </div>
      </div>
    </ModifyModal>
  );
};

export default InventoryModifyModal;
