import { CSSProperties } from "react";

export const tableCellStyle: CSSProperties = {
  border: "1px solid black",
  padding: "8px",
};

export const modalStyle: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
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
  ...tableCellStyle,
  cursor: "pointer",
};

export const hoverCellStyle: CSSProperties = {
  ...clickableCellStyle,
  backgroundColor: "#83bcff",
};
