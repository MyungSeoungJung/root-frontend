import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import { ProfileContainer, ProfileImage } from "../UserProfile/style";
import { logout } from "../../utils/logout";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const { profileImage, brandName } = useContext(ProfileContext);
  const navigate = useNavigate();

  // 로그아웃 버튼의 클릭 이벤트 핸들러
  const handleLogoutClick = () => {
    logout(navigate); // navigate 함수를 logout에 전달
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "left",
        paddingBottom: "20px",
        backgroundColor: "rgba(128, 128, 128, 0.5)",
        borderRadius: "10px",
      }}
    >
      {profileImage && (
        <ProfileContainer>
          <ProfileImage src={profileImage} alt="Profile" />
        </ProfileContainer>
      )}
      <div>
        <h3 style={{ color: "white", marginTop: "5px" }}>BRAND</h3>
        {brandName && (
          <h3 style={{ marginTop: "10px", color: "white", fontSize: "rem" }}>
            {brandName}
          </h3>
        )}
        <button
          style={{
            color: "white",
            fontSize: "0.9rem",
            borderRadius: "10px",
            backgroundColor: "#202123",
            marginTop: "10px",
          }}
          onClick={handleLogoutClick}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
