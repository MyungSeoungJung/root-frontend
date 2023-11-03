import { useEffect, useRef, useState } from "react";
import { ProductRegistrationContainer } from "./style";
import * as React from "react";
import http from "@/modules/StoreManagement/utils/http";
// import axios from "axios";

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
  const mainImgRef = useRef<HTMLInputElement>();
  const formRef = useRef<HTMLFormElement>();
  const [imgPreview, setImgPrewview] = useState([]);
  const [userBrand, setUserBrand] = useState();
  const [mainImgPreview, setMainImgPrewview] = useState([]);

  //로그인한 유저의 브랜드정보 get요청
  useEffect(() => {
    const fetchData = async () => {
      // async 함수 정의
      try {
        const response = await http.get(
          `http://192.168.100.152:5500/user/brandName`
        );
        // 여기서 response를 사용할 수 있습니다.
        setUserBrand(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // async 함수를 호출하여 실행
  }, []);

  const handleProductRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !productNameRef.current.value ||
      !productPriceRef.current.value ||
      !maximumQuantityRef.current.value ||
      categoryRef.current.value === "null"
    ) {
      alert("필수 정보를 모두 입력해주세요.");
      return; // 폼 전송을 중단
    }
    if (!fileRef.current.files.length) {
      alert("이미지 파일을 선택해주세요.");
      return; // 폼 전송을 중단
    }

    const formData = new FormData();
    Array.from(fileRef.current.files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("mainFile", mainImgRef.current.files[0]);
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
        setImgPrewview([]);
        setMainImgPrewview([]);
        alert("상품 등록을 완료했습니다");
      }
    })();
  };
  // 이미지 미리보기

  const handleImgPreview = (event) => {
    const files = event.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === files.length) {
          setImgPrewview(previews); // 수정된 부분
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const handleMainImgPreview = (event) => {
    if (event.target.files.length > 1) {
      alert("대표 이미지는 1개만 선택할 수 있습니다.");
      event.target.value = ""; // 선택한 이미지를 지움
      return;
    }
    const files = event.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === files.length) {
          setMainImgPrewview(previews); // 수정된 부분
        }
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <ProductRegistrationContainer>
      <h1>상품 등록</h1>
      <form onSubmit={handleProductRegister} ref={formRef}>
        <div>
          <div>
            <div>
              <p>브랜드 </p> <p ref={productBrandRef}> {userBrand}</p>
            </div>
            <div>
              <p> 상품명 </p>{" "}
              <input placeholder="상품명" ref={productNameRef} />
            </div>
            <div>
              <p> 판매가 </p>
              <input type="number" placeholder="판매가" ref={productPriceRef} />
            </div>
            <div>
              <p> 상품 상태: </p>
              <select ref={isActiveRef}>
                <option selected disabled hidden>
                  상품의 상태를 선택해주세요
                </option>
                <option value="1">판매</option>
                <option value="0">숨김</option>
              </select>
            </div>
            <div>
              <p>주문 수량 </p>
              <input
                type="number"
                min={1}
                max={99}
                placeholder="주문 최대 수량"
                ref={maximumQuantityRef}
              />
            </div>
            <div>
              <p>할인 </p>
              <input
                type="number"
                defaultValue={0}
                min={0}
                max={100}
                placeholder="할인율"
                ref={discountRateRef}
              />
            </div>
            <div>
              <p> 상품 대분류 </p>
              <select ref={categoryRef}>
                <option value="null" selected disabled hidden>
                  옵션을 선택해주세요
                </option>
                <option value="tent">텐트</option>
                <option value="table">테이블</option>
                <option value="accessory">악세서리</option>
                <option value="tableware">식기류</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div>
              <p> 상품 설명 </p>
              <textarea
                placeholder="상품 상세설명을 적어주세요"
                ref={prodcutDescriptionRef}
              ></textarea>
            </div>
          </div>
          <div>
            <div>
              <p>대표 이미지 </p>
              <input
                type="file"
                multiple
                accept="image/*, video/*"
                ref={mainImgRef}
                onChange={handleMainImgPreview}
              />
            </div>
            <div
              style={{
                height: "180px",
                backgroundColor: "rgba(188, 239, 255, 0.5)",
                display: "flex",
                flexDirection: "row",
                paddingBottom: "3px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              {mainImgPreview.length === 0 && (
                <p style={{ width: "200px", textAlign: "center" }}>
                  대표 이미지 미리보기
                </p>
              )}
              {mainImgPreview.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {mainImgPreview.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      style={{
                        width: "100px",
                        height: "120px",
                        marginRight: "5px",
                        marginLeft: "5px",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <p>상품 이미지 </p>
              <input
                type="file"
                multiple
                accept="image/*, video/*"
                ref={fileRef}
                onChange={handleImgPreview}
              />
            </div>
            {/* 이미지 미리보기 */}
            <div
              style={{
                height: "180px",
                backgroundColor: "rgba(188, 239, 255, 0.5)",
                display: "flex",
                flexDirection: "row",
                paddingBottom: "3px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              {imgPreview.length === 0 && (
                <p style={{ width: "200px", textAlign: "center" }}>
                  이미지 미리보기
                </p>
              )}
              {imgPreview.length > 0 && (
                <div>
                  {imgPreview.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      style={{
                        width: "100px",
                        height: "120px",
                        marginRight: "5px",
                        marginLeft: "5px",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* 미리보기 ------ */}
            <div>
              <button> 상품 등록 </button>
            </div>
          </div>
        </div>
      </form>
    </ProductRegistrationContainer>
  );
};

export default ProductRegistration;
