import { getCookie } from "@/utils/cookie";
import axios from "axios";
import { useState } from "react";

function ProfileRegister() {
  const [brandName, setBrandName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [brandIntro, setBrandIntro] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profileImage) return;

    const formData = new FormData();
    formData.append("brandName", brandName);
    formData.append("businessNumber", businessNumber);
    formData.append("representativeName", representativeName);
    formData.append("brandIntro", brandIntro);
    formData.append("profileImage", profileImage);

    const token = getCookie("token");
    if (!token) {
      console.error("토큰이 존재하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.100.152:5500/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setBrandName("");
      setBusinessNumber("");
      setRepresentativeName("");
      setBrandIntro("");
      setProfileImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("프로필 등록 실패", error);
    }
  };

  return (
    <div>
      <h1>프로필 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>상호명: </label>
          <input
            type="text"
            name="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>
        <div>
          <label>사업자 번호: </label>
          <input
            type="text"
            name="businessNumber"
            value={businessNumber}
            onChange={(e) => setBusinessNumber(e.target.value)}
          />
        </div>
        <div>
          <label>대표자명: </label>
          <input
            type="text"
            name="representativeName"
            value={representativeName}
            onChange={(e) => setRepresentativeName(e.target.value)}
          />
        </div>
        <div>
          <label>브랜드 한줄소개: </label>
          <input
            type="text"
            name="brandIntro"
            value={brandIntro}
            onChange={(e) => setBrandIntro(e.target.value)}
          />
        </div>
        <div>
          <label>프로필 사진첨부: </label>
          <input type="file" onChange={handleImageChange} name="profileImage" />
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
