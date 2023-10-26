import { useRef, useState } from "react";
import { ProductRegistrationContainer } from "./style";
import * as React from "react";
import http from "@/modules/StoreManagement/utils/http";

interface ProductItem {
  productBrand: string;
  productName: string;
  productPrice: number;
  category: string;
  isActive: boolean;
  maximumPurchaseQuantity: number;
  prodcutDescription: string;
  discountRate: number;
}
interface ProductFile {
  contentType: string;
  originalFileName: string;
  uuidFileName: string;
}

const ProductRegistration = () => {
  const productBrandRef = useRef<HTMLDivElement>();
  const productNameRef = useRef<HTMLInputElement>();
  const productPriceRef = useRef<HTMLInputElement>();
  const categoryRef = useRef<HTMLSelectElement>();
  const isActiveRef = useRef<HTMLSelectElement>();
  const maximumQuantityRef = useRef<HTMLInputElement>();
  const discountRateRef = useRef<HTMLInputElement>();
  const prodcutDescriptionRef = useRef<HTMLTextAreaElement>();
  const fileRef = useRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>();

  const handleProductRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Array.from(fileRef.current.files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("productBrand", productBrandRef.current.innerText);
    formData.append("productName", productNameRef.current.value);
    formData.append("productPrice", productPriceRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("isActive", isActiveRef.current.value);
    formData.append(
      "maximumPurchaseQuantity",
      maximumQuantityRef.current.value
    );
    formData.append("discountRate", discountRateRef.current.value);
    formData.append("productDescription", prodcutDescriptionRef.current.value);
    console.log("category:", categoryRef.current.value);
    (async () => {
      const response = await http.post<ProductItem>(
        "/product/registerProduct",
        formData
      );
      console.log(response);
      if (response.status === 201) {
        formRef.current.reset();
        alert("상품 등록을 완료했습니다");
      }
    })();
  };
  return (
    <ProductRegistrationContainer>
      <h1>상품 등록</h1>
      <section>
        <form onSubmit={handleProductRegister} ref={formRef}>
          <div>
            <p>브랜드: </p> <p ref={productBrandRef}> Nike</p>
          </div>
          <div>
            <p> 상품명: </p> <input placeholder="상품명" ref={productNameRef} />
          </div>
          <div>
            <p> 판매가: </p>
            <input placeholder="판매가" ref={productPriceRef} />
          </div>
          <div>
            <p> 상품 상태: </p>
            <select ref={isActiveRef}>
              <option>상품의 상태를 선택해주세요</option>
              <option value="1">판매</option>
              <option value="0">숨김</option>
            </select>
          </div>
          <div>
            <p>주문 최대 수량: </p>
            <input placeholder="주문 수량" ref={maximumQuantityRef} />
          </div>
          <div>
            <p>할인: </p>
            <input placeholder="할인율" ref={discountRateRef} />
          </div>
          <div>
            <p> 상품 대분류: </p>
            <select ref={categoryRef}>
              <option>옵션을 선택해주세요</option>
              <option value="tent">텐트</option>
              <option value="table">테이블</option>
              <option value="accessory">악세서리</option>
              <option value="tableware">식기류</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div>
            <p> 상품 설명: </p>
            <textarea
              placeholder="상품 상세설명을 적어주세요"
              ref={prodcutDescriptionRef}
            ></textarea>
          </div>
          <div>
            <p>상품 이미지: </p>{" "}
            <input
              type="file"
              multiple
              accept="image/*, video/*"
              ref={fileRef}
            />
          </div>
          <button> 상품 등록 </button>
        </form>
      </section>
    </ProductRegistrationContainer>
  );
};

export default ProductRegistration;
