import { CSSProperties } from "react";

export const tableCellStyle: CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  verticalAlign: "middle",
  textOverflow: "ellipsis",
  backgroundColor: "#fff",
  whiteSpace: "nowrap",
};

export const modalOverlayStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

export const modalContainerStyle: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  transform: "translate(-50%, -50%)",
  width: "auto", // 가로 폭을 내용에 맞추어 자동으로 조절
  minWidth: "500px", // 최소 너비 설정
  minHeight: "150px", // 최소 높이 설정
  maxHeight: "calc(100vh - 210px)", // 화면의 높이에서 적당한 크기를 빼서 최대 높이 설정
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  borderRadius: "5px",
  overflowY: "hidden", // 세로 스크롤바 설정
  backgroundColor: "white", // 배경색은 흰색으로
  zIndex: 1060, // 가장 높은 순위
};

export const modalContentStyle: CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
};

export const clickableCellStyle: CSSProperties = {
  ...tableCellStyle,
  cursor: "pointer",
};

export const hoverCellStyle: CSSProperties = {
  ...clickableCellStyle,
  backgroundColor: "#83bcff",
};

export const answerButtonStyle: CSSProperties = {
  color: "white", // 버튼의 텍스트 색상을 흰색으로 변경
  padding: "6px 12px", // 버튼의 패딩 조정
  borderRadius: "4px", // 버튼의 모서리를 둥글게
  zIndex: 1050, // Ensure it is above the table but below the modals
};

// 문의내용 전체보기 모달 스타일
export const inqueryContentModalStyle: CSSProperties = {
  ...modalContainerStyle,
  width: "50%", // 모달의 가로 폭을 좁게 설정
  height: "auto", // 내용에 따라 크기 조정
  maxHeight: "80%", // 최대 높이 설정
  overflowY: "auto", // 내용이 넘칠 경우 스크롤
  zIndex: 1060, // 다른 요소들보다 상단에 위치하도록 가장 높은 설정
};

// 답변 모달 스타일
export const answerModalStyle: CSSProperties = {
  position: "fixed",
  top: "10%", // 위쪽 여백을 넓혀줌
  left: "50%",
  transform: "translateX(-50%)",
  width: "50%", // 가로 크기를 줄임
  minHeight: "30%", // 최소 세로 크기를 설정
  maxHeight: "90vh", // 최대 세로 크기를 설정
  overflowY: "auto", // 내용이 많을 경우 스크롤 가능
  overflow: "hidden",
  backgroundColor: "white",
  padding: "30px",
  boxSizing: "border-box",
  borderRadius: "5px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  zIndex: 1050,
  display: "flex",
  flexDirection: "column", // 모달 내부 아이템을 세로로 정렬
};

export const answerInputStyle: CSSProperties = {
  resize: "none", // 사용자가 크기 조절 못하게 설정
  minHeight: "150px", // 입력 박스의 최소 세로 크기
  width: "100%", // 입력 박스를 모달 너비에 맞춰서 100%로 설정
  marginBottom: "20px", // 입력 박스와 버튼 사이의 마진 설정
};

export const answerButtonGroupStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center", // 버튼들을 중앙에 위치시킴
  gap: "10px", // 버튼 사이의 간격 설정
};

export const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse", // 테이블 테두리 겹치기
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 테이블에 그림자 효과 추가
};

export const tableHeaderStyle: CSSProperties = {
  backgroundColor: "#004085", // 헤더 배경색을 짙은 색으로 설정
  color: "black",
  padding: "10px", // 헤더의 패딩
  textAlign: "left", // 헤더의 텍스트 정렬
};
