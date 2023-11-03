import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import { ProfileContainer, ProfileImage } from "../UserProfile/style";

const UserProfile = () => {
  const { profileImage, brandName } = useContext(ProfileContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "20px",
        backgroundColor: "rgba(128, 128, 128, 0.5)",
        borderRadius: "10px",
      }}
    >
      <h3 style={{ color: "white", marginTop: "5px" }}>BRAND</h3>
      {profileImage && (
        <ProfileContainer>
          <ProfileImage src={profileImage} alt="Profile" />
        </ProfileContainer>
      )}
      {brandName && <h1 style={{ marginTop: "10px" }}>{brandName}</h1>}
    </div>
  );
};

export default UserProfile;
