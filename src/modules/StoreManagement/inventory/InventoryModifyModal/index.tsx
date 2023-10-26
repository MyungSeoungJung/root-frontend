import { useRef } from "react";
import { ModifyModal } from "./style";

interface ModifyModalProps {
  index: number;
  isActive: boolean;
  productName: string;
  quantity: string;
  productPrice: string;
  maximumPurchaseQuantity: string;
  discountRate: string;
  onConfirm: (payload: {
    index: number;
    isActive: boolean;
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
  const discountRateRef = useRef<HTMLInputElement>();
  const handleConfirm = () => {
    onConfirm({
      index,
      isActive: activeRef.current.value === "true",
      productName: productNameRef.current.value,
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
            <h1>재고 수정</h1>
            <select ref={activeRef}>
              <option>수정 할 상품의 상태를 선택해주세요</option>
              <option value="true">판매</option>
              <option value="false">숨김</option>
            </select>
            <input defaultValue={productName} ref={productNameRef} />
            <input defaultValue={quantity} ref={quantityRef} />
            <input defaultValue={productPrice} ref={productPriceRef} />
            <input
              defaultValue={maximumPurchaseQuantity}
              ref={maximumPurchaseQuantityRef}
            />
            <input defaultValue={discountRate} ref={discountRateRef} />
            <button onClick={handleConfirm}>수정</button>
            <button onClick={onCancel}>취소</button>
          </div>
        </div>
      </div>
    </ModifyModal>
  );
};

export default InventoryModifyModal;
