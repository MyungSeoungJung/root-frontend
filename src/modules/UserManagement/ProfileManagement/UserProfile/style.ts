import styled from "@emotion/styled";

export const ProfileContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* margin-left: 20px; */
  overflow: hidden;
  position: relative;
  margin-right: 30px;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
