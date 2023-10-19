import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";

const UserProfile = () => {
  const { profileImage, brandName } = useContext(ProfileContext);

  return (
    <div>
      {profileImage && <img src={profileImage} alt="Profile" />}
      {brandName && <h2>{brandName}</h2>}
    </div>
  );
};

export default UserProfile;
