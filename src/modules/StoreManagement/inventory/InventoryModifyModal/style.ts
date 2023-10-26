import styled from "@emotion/styled";

export const ModifyModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  div > div:nth-of-type(1) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  div > div:nth-of-type(1) > div:nth-last-of-type(1) {
    width: 400px;
    height: 400px;
    background-color: white;
    border-radius: 20px;
  }
  div > div:nth-of-type(1) > div:nth-last-of-type(1) input {
    width: 50%;
  }
  div > div:nth-of-type(1) > div:nth-last-of-type(1) select {
    width: 50%;
  }
  div > div:nth-of-type(1) button {
    width: 200px;
  }
  h1 {
    color: wheat;
  }
`;
