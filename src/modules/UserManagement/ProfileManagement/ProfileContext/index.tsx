import { useState, useEffect, createContext, ReactNode } from "react";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "@/utils/cookie";

interface ProfileContextProps {
  profileImage: string | null;
  brandName: string | null;
}

interface UserInfoResponseData {
  userId: string;
  uuid: string;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const token = getCookie("token");
  if (!token) {
    console.error("토큰이 존재하지 않습니다.");
    return <>{children}</>;
  }

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfileDetails() {
      try {
        const userInfoResponse = await axios.get<UserInfoResponseData>(
          "http://localhost:5500/user/getUserInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userId = userInfoResponse.data.userId;
        const uuid = userInfoResponse.data.uuid;

        const imageResponse: AxiosResponse<ArrayBuffer> = await axios.get(
          `http://localhost:5500/user/profileImage/${userId}/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "arraybuffer",
          }
        );

        const base64Image = btoa(
          new Uint8Array(imageResponse.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        setProfileImage(`data:image/png;base64,${base64Image}`);
      } catch (error) {
        console.error(
          "이미지를 받아오는 중 에러발생 : ",
          error.response || error.message
        );
      }

      try {
        const response = await axios.get<string>(
          "http://localhost:5500/user/brandName",
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
    <ProfileContext.Provider value={{ profileImage, brandName }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
