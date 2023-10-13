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
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: gray; */
  }
  form div {
    justify-content: start;
    display: flex;
    flex-direction: row;
    width: 50%;
    /* background-color: red; */
  }
  form p {
    width: 100px;
  }
  form input {
    width: 200px;
  }
  textarea {
    width: 300px;
    height: 200px;
  }
  button {
    width: 100px;
    height: 40px;
    border-radius: 10px;
  }
`;
