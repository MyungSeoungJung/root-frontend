import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";
import { ProfileContainer, ProfileImage } from "../UserProfile/style";

const UserProfile = () => {
  const { profileImage, brandName } = useContext(ProfileContext);

  return (
    <div>
      {profileImage && (
        <ProfileContainer>
          <ProfileImage src={profileImage} alt="Profile" />
        </ProfileContainer>
      )}
      {brandName && <h2>{brandName}</h2>}
    </div>
  );
};

export default UserProfile;
