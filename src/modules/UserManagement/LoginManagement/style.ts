import styled from "styled-components";

export const LoginStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;

  form input {
    width: 300px;
    height: 40px;
    border: none;
    border-radius: 5px;
  }
  input:focus {
    box-shadow: rgba(5, 102, 214, 1) 0px 0px 10px 3px;
    border: 1px solid gray;
  }
  form {
    color: white;
  }
  form button {
    margin-top: 70px;
    width: 300px;
    height: 40px;
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
