import styled from "@emotion/styled";

export const TableContainer = styled.div`
  section {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    margin-top: 25px;
    height: 100%;
    position: relative;
  }
  section > div:nth-of-type(1) {
    background-color: white;
    width: 90%;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 0;
    border-radius: 10px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
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
    border-radius: 20px;
  }
  /* thead */
  table thead tr td:nth-of-type(1) {
    border-top-left-radius: 20px;
  }
  table thead tr td:nth-last-of-type(1) {
    border-top-right-radius: 20px;
  }
  table thead tr td {
    padding: 20px;
    background-color: rgba(54, 185, 204, 0.3);
    color: #048a81;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
  }
  table thead tr td:nth-of-type(1) {
    padding-left: 25px;
  }
  /* thead */

  table td {
    padding-top: 10px;
    text-align: center;
    vertical-align: middle;
  }
  table button {
    padding: 5px;
    border-radius: 10px;
    margin-left: 15px;
    margin-right: 10px;
  }
  table tr:nth-last-of-type(1) td {
    padding-bottom: 15px;
  }
  nav {
    display: flex;
    justify-content: start;
    border-bottom: 2px solid gray;
    padding-bottom: 20px;
    padding-left: 0;
  }
  nav div {
    margin-right: 50px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    background-color: #36b9cc;
    color: white;
    transform: scale(1);
  }
  nav div:hover {
    background-color: #36b9cc;
    transition: background-color 0.2s, transform 0.15s;
    transform: scale(1.1);
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
    border-radius: 10px;
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

  aside > div {
    background-color: white;
    left: 80%;
    /* top: 500px; */
    position: fixed;
    width: 200px;
    border-radius: 10px;
    z-index: 10;
  }
  aside > div > div:nth-of-type(1) {
    background-color: rgba(78, 115, 223, 1);
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  aside > div > div:nth-of-type(2) {
    padding: 10px;
  }
  #x-box-icon {
    font-size: 12px;
    color: white;
  }
  #x-box-icon:hover {
    color: red;
  }
  #fabell-icon {
    color: rgba(78, 115, 223, 1);
  }
`;
