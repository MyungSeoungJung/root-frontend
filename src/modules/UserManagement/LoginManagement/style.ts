import styled from "styled-components";

export const LoginStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  form input {
    width: 300px;
    height: 30px;
    border: none;
    border-radius: 5px;
  }
  form {
    color: white;
  }
  form button {
    margin-top: 70px;
    width: 200px;
    height: 35px;
    border: none;
    border-radius: 10px;
    background-color: rgba(78, 115, 223, 1);
    color: white;
    transform: scale(1);
  }

  form button:hover {
    background-color: #83bcff;
    transition: background-color 0.2s, transform 0.2s;
    transform: scale(1.1);
  }
`;
