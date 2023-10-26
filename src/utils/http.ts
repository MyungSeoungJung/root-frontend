import axios from "axios";
import { getCookie } from "./cookie";
// 개발자 도구 애플리케이션 임시 유저 2토큰
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwidXNlcm5hbWU
// iOiJ1c2VyMiIsImlhdCI6MTY5NzE4MzA4NywiZXhwIjoxNjk3Nzg3ODg3fQ.kj29hEiExxRU0BZ93jZaEKUoPbfzZICYSuOcYNNSBH8
const http = axios.create({
  baseURL: "http://localhost:5500",
  withCredentials: true,
});

// 요청값에 대해서 사전처리
http.interceptors.request.use((config) => {
  const token = getCookie("token");
  console.log("---token---");
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("잘못된 요청입니다.");
  }
  return config;
});

// 응답값에 대해서 사전처리
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;

    if (status === 401 || status == 403) {
      alert("인증이 필요하거나 토큰이 만료되었습니다.");
      // 로그인 페이지로 이동
      // window.location.href = "/"
    }

    if (status === 404) {
      alert("데이터 존재하지 않습니다.");
    }

    // return Promise.reject(error);
    return;
  }
);

export default http;
