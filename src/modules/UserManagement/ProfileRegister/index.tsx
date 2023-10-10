import { useState } from "react";

function ProfileRegister() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <h1>프로필 등록</h1>
      <form>
        <div>
          <label>상호명: </label>
          <input type="text" name="businessName" />
        </div>
        <div>
          <label>사업자 번호: </label>
          <input type="text" name="businessNumber" />
        </div>
        <div>
          <label>대표자명: </label>
          <input type="text" name="ownerName" />
        </div>
        <div>
          <label>브랜드 한줄소개: </label>
          <input type="text" name="brandIntro" />
        </div>
        <div>
          <label>프로필 사진첨부: </label>
          <input type="file" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="프로필 미리보기"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default ProfileRegister;
