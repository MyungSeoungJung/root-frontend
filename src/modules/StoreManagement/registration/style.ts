import styled from "@emotion/styled";

export const ProductRegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    background-color: white;
    width: 83%;
    padding: 20px;
    border-radius: 10px;
    margin-top: 50px;
  }
  section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  form {
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    margin-top: 30px;
    padding: 10px;
    border-radius: 10px;
  }
  form > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  form > div:nth-child(1) > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    padding-right: 10px;
  }
  form > div:nth-child(1) > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }

  form div {
    justify-content: start;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 7px;
  }

  form > div:nth-child(1) > div:nth-child(2) > div:last-of-type {
    display: flex;
    justify-content: center;
  }
  form > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) {
  }
  form > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {
    margin-bottom: 20px;
  }
  form > div:nth-child(1) > div:nth-child(1) > div:nth-child(8) {
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  form p {
    width: 100px;
  }
  form input {
    width: 50%;
  }
  textarea {
    width: 100%;
    height: 172px;
    margin-top: 10px;
  }
  button {
    height: 40px;
    width: 100px;
    border-radius: 10px;
  }
`;
