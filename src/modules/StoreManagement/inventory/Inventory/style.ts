import styled from "@emotion/styled";

export const TableContainer = styled.div`
  section {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    margin-top: 25px;
  }
  section > div:nth-of-type(1) {
    background-color: white;
    width: 90%;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 0;
    border-radius: 10px;
    padding-left: 10px;
  }
  section > div:nth-of-type(2) {
    width: 90%;
    background-color: e0e0e0;
    height: 300px;
    margin-top: 30px;
  }

  table {
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 5px;
  }
  nav {
    display: flex;
    justify-content: start;
    background-color: e0e0e0;
    border-bottom: 2px solid gray;
    padding-bottom: 20px;
    padding-left: 0;
  }
  nav div {
    margin-right: 50px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
  }
  nav div:hover {
    color: #4adda2;
  }
  #inputContainer {
    display: flex;
    margin-bottom: 20px;
    background-color: e0e0e0;
    margin-top: 30px;
  }
  #inputContainer > div:nth-of-type(1) {
    flex: 0.9;
    margin-right: 15px;
  }
  #inputContainer > div:nth-of-type(1) > input {
    width: 100%;
    height: 40px;
  }
  #inputContainer > div:nth-of-type(2) {
    flex: 0.4;
    margin-left: 15px;
  }
  #inputContainer > div:nth-of-type(3) {
    flex: 0.1;
    margin-left: 15px;
  }
  #inputContainer > div:nth-of-type(4) {
    flex: 0.1;
    margin-left: 15px;
  }
  #inputContainer > div:nth-of-type(2) > button {
    width: 100%;
    height: 45px;
  }
  #inputContainer > div:nth-of-type(3) > button {
    width: 100%;
    height: 45px;
    border-radius: 30px;
  }
  #inputContainer > div:nth-of-type(4) > button {
    width: 100%;
    height: 45px;
    border-radius: 30px;
  }
`;
