import { css, keyframes } from "styled-components";

export const chartControls = css`
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
`;

export const buttonStyle = css`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const chartTitleStyle = (
  fontFamily: string,
  fontSize: string,
  fontWeight: string
) => css`
  font-family: "${fontFamily}";
  font-size: ${fontSize};
  font-weight: ${fontWeight};
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const pieChartAnimation = css`
  animation: ${spin} 20s linear infinite;
`;
