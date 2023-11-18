import styled from "@emotion/styled";
import { CSSProperties } from "react";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #dee2e6;
    padding: 8px;
    text-align: left;
  }
  tr:nth-of-type(odd) {
    background-color: #83bcff; // 홀수 줄에 대한 배경색
  }
  th {
    background-color: #f4f4f4;
  }
`;

export const modalStyle: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "50%", // 모달 너비를 화면의 90%로 설정
  maxWidth: "600px",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#83bcff",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000,
};

export const Backdrop: CSSProperties = {
  position: "fixed", //absolute
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 500,
};

export const modalContentStyle: CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
};

export const modalBoxStyle: CSSProperties = {
  ...modalStyle,
  padding: "20px",
  boxSizing: "border-box",
  borderRadius: "5px",
};

export const clickableCellStyle: CSSProperties = {
  cursor: "pointer",
};

export const hoverCellStyle: CSSProperties = {
  ...clickableCellStyle,
  backgroundColor: "#83bcff",
};

export const dropdownStyle: CSSProperties = {
  padding: "10px",
  margin: "0 5px",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ddd",
  borderRadius: "5px",
  color: "#333",
  cursor: "pointer",
  fontFamily: "CuteFont-Regular",
  fontSize: "25px",
  lineHeight: "1.5",
  display: "inline-block",
  width: "auto",
  boxSizing: "border-box",
};
