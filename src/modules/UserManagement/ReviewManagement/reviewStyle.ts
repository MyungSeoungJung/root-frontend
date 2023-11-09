import styled from "@emotion/styled";
import { CSSProperties } from "react";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
`;

const activeBackgroundColor = "rgba(78, 115, 223, 1)";

export const AnswerButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) =>
    disabled ? "#aaa" : activeBackgroundColor};
  color: white;
  padding: 10px 15px;
  margin: 5px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transform: scale(1);
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#aaa" : "#83bcff")};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
  }
`;
