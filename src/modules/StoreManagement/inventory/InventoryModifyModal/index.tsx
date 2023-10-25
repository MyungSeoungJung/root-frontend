import { useRef } from "react";

interface ModifyModalProps {
  index: number;
  isActive: boolean;
  productName: string;
  quantity: string;
  productPrice: string;
  onConfirm: (payload: {
    index: number;
    isActive: boolean;
    productName: string;
    quantity: string;
    productPrice: string;
  }) => void;
  onCancel: () => void;
}

const InventoryModifyModal = ({
  index,
  isActive,
  productName,
  quantity,
  productPrice,
  onConfirm,
  onCancel,
}: ModifyModalProps) => {
  const activeRef = useRef<HTMLSelectElement>();
  const productNameRef = useRef<HTMLInputElement>();
  const quantityRef = useRef<HTMLInputElement>();
  const productPriceRef = useRef<HTMLInputElement>();
  const handleConfirm = () => {
    onConfirm({
      index,
      isActive: activeRef.current.value === "true",
      productName: productNameRef.current.value,
      quantity: quantityRef.current.value,
      productPrice: productPriceRef.current.value,
    });
  };
  return (
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
      <button onClick={handleConfirm}>수정</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};

export default InventoryModifyModal;
