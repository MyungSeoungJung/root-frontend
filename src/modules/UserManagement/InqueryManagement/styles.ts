import { CSSProperties } from "react";
import styled from "@emotion/styled";

export const tableCellStyle: CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  verticalAlign: "middle",
  textOverflow: "ellipsis",
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
  backgroundColor: "#e1f3ff",
};

export const answerButtonStyle: CSSProperties = {
  color: "white",
  padding: "6px 12px",
  borderRadius: "4px",
  zIndex: 1050,
};

export const inqueryContentModalStyle: CSSProperties = {
  ...modalContainerStyle,
  width: "50%",
  height: "auto",
  maxHeight: "80%",
  overflowY: "auto",
  zIndex: 1060,
};

export const answerModalStyle: CSSProperties = {
  position: "fixed",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "50%",
  minHeight: "30%",
  maxHeight: "90vh",
  overflowY: "auto",
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
  resize: "none",
  minHeight: "150px",
  width: "100%",
  marginBottom: "20px",
};

export const answerButtonGroupStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

export const inquiryHoverCellStyle: CSSProperties = {
  ...hoverCellStyle,
  backgroundColor: "#b0daff",
};

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #dee2e6;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-of-type(odd) td {
    background-color: #83bcff; // 홀수 행의 모든 셀에 배경색 적용
  }

  tr:nth-of-type(even) td {
    background-color: #fff; // 짝수 행의 모든 셀에 배경색 적용
  }

  td.clickable {
    cursor: pointer;
    &:hover {
      background-color: #b0daff; // 호버 상태일 때 적용될 배경색
    }
  }
`;
