import { useNavigate } from "react-router-dom";

export const logout = (navigate: Function) => {
  // 쿠키 삭제 로직
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  navigate("/");
};
