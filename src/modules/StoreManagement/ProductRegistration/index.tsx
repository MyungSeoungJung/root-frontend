import { useState } from "react";
import { ProductRegistrationContainer } from "./style";

const ProductRegistration = () => {
  // 상품 카테고리 변경 이벤트
  const handleMajorCatagoryChange = (event) => {
    const selectedValue = event.target.value;
    const subCategories = {
      텐트: ["돔텐트", "사각텐트", "육각텐트", "등산용텐트", "차박텐트"],
      테이블: ["BBQ테이블", "미니 테이블", "화로 테이블", "사이드 테이블"],
      식기류: ["포크", "스푼", "접시", "컵류"],
      악세서리: ["코펠", "조리 도구", "아이스박스", "물통"],
      기타: ["기타1", "기타2"],
    };

    const subCategorySelect = document.getElementById("subCatagory");
    subCategorySelect.innerHTML = ""; // 기존 옵션 초기화
    // subCategories[텐트]
    if (selectedValue && subCategories[selectedValue]) {
      subCategories[selectedValue].forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.innerText = option;
        subCategorySelect.appendChild(optionElement);
      });
    }
  };
  return (
    <ProductRegistrationContainer>
      <h1>상품 등록</h1>
      <section>
        <form action="">
          <div>
            <p>브랜드: </p> <p> 토큰 받아서 고정으로 띄울 곳</p>
          </div>
          <div>
            <p> 상품명: </p> <input placeholder="상품명" />
          </div>
          <div>
            <p> 판매가: </p> <input placeholder="판매가" />
          </div>
          <div>
            <p> 상품코드: </p> <input placeholder="상품코드" />
          </div>
          <div>
            <p> 상품 대분류: </p>
            <select onChange={handleMajorCatagoryChange}>
              <option>옵션을 선택해주세요</option>
              <option value="텐트">텐트</option>
              <option value="테이블">테이블</option>
              <option value="식기류">식기류</option>
              <option value="악세서리">악세서리</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div>
            <p> 상품 소분류: </p>
            <select id="subCatagory">{/*동적으로 카테고리 생성 */}</select>
          </div>
          <div>
            <p> 상품 설명: </p>{" "}
            <textarea placeholder="상품 상세설명을 적어주세요"></textarea>
          </div>
          <div>
            <p>상품 이미지: </p> <input type="file" multiple accept="image/*" />
          </div>
          <button> 상품 등록 </button>
        </form>
      </section>
    </ProductRegistrationContainer>
  );
};

export default ProductRegistration;
