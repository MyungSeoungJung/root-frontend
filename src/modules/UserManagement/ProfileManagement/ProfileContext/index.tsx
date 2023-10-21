import { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";

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
  const token = localStorage.getItem("token");

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

        const imageResponse = await axios.get<string>(
          `http://localhost:5500/user/profileImage/${userId}/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileImage(imageResponse.data);
      } catch (error) {
        console.error("이미지를 받아오는 중 에러발생 : ", error);
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
