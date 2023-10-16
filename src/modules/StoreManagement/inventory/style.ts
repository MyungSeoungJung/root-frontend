import styled from "@emotion/styled";

export const InventoryContainer = styled.div`
  section {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
  }
  section > div {
    width: 90%;
    background-color: e0e0e0;
    height: 300px;
  }
  table {
    background-color: white;
    width: 100%;
    height: 100%;
  }
  nav {
    display: flex;
    justify-content: start;
    background-color: e0e0e0;
    border-bottom: 2px solid black;
    padding-bottom: 20px;
    padding-left: 0;
  }
  nav div {
    margin-right: 50px;
  }
  nav div:hover {
    color: #4adda2;
  }
  #inputContainer {
    display: flex;
    margin-bottom: 20px;
    background-color: e0e0e0;
  }
  #inputContainer > div:nth-of-type(1) {
    flex: 0.8;
    margin-right: 15px;
  }
  #inputContainer > div:nth-of-type(1) > input {
    width: 100%;
    height: 40px;
  }
  #inputContainer > div:nth-of-type(2) {
    flex: 0.2;
    margin-left: 15px;
  }
  #inputContainer > div:nth-of-type(2) > button {
    width: 100%;
    height: 45px;
  }
`;
