import styled from "@emotion/styled";

export const ProductRegistrationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2rem;
  }
  section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  section > div:nth-of-type(1) {
    display: flex;
    flex: 1;
    height: 100%;
  }
  section > div:nth-of-type(2) {
    display: flex;
    flex: 2.5;
    height: 90%;
    flex-direction: column;
    background-color: white;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  section > div:nth-of-type(3) {
    display: flex;
    height: 100%;
    flex: 1;
  }
  section > form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form div {
    justify-content: start;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 7px;
    /* background-color: red; */
  }
  form div:last-of-type {
    display: flex;
    justify-content: center;
  }
  form p {
    width: 100px;
  }
  form input {
    width: 200px;
  }
  textarea {
    width: 300px;
    height: 170px;
  }
  button {
    width: 100px;
    height: 40px;
    border-radius: 10px;
  }
`;
