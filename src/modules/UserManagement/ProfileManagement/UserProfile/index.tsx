import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import { ProfileContainer, ProfileImage } from "../UserProfile/style";

const UserProfile = () => {
  const { profileImage, brandName } = useContext(ProfileContext);

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
      </div>
    </div>
  );
};

export default UserProfile;
