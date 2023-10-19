import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfileDetails() {
      try {
        const response = await axios.get<ArrayBuffer>(
          "http://192.168.100.152:5500/user/profileImage",
          {
            headers: {
              Authorization: `Bearer + ${token}`,
            },
            responseType: "arraybuffer",
          }
        );
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setProfileImage(
          `data:${response.headers["content-type"]};base64,${base64Image}`
        );
      } catch (error) {
        console.error("이미지를 받아오는 중 에러발생:", error);
      }

      try {
        const response = await axios.get<string>(
          "http://192.168.100.152:5500/user/brandName",
          {
            headers: {
              Authorization: `Bearer + ${token}`,
            },
          }
        );
        setBrandName(response.data);
      } catch (error) {
        console.error("브랜드명을 받아오는 중 에러발생: ", error);
      }
    }

    fetchProfileDetails();
  }, []);

  return (
    <div>
      {profileImage && <img src={profileImage} alt="Profile" />}
      {brandName && <h2>{brandName}</h2>}
    </div>
  );
};

export default UserProfile;
