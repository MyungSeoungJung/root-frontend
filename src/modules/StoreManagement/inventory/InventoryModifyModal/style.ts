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
  background-color: rgba(0, 0, 0, 0.5); //전체

  div > div:nth-of-type(1) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } //위치 잡는 div
  div > div:nth-of-type(1) > div {
    //실제 수정박스
    width: 400px;
    height: 400px;
    background-color: white;
    flex-direction: column;
    border-radius: 20px;
  }

  div > div:nth-of-type(1) > div > div:nth-of-type(2) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div > div:nth-of-type(1) > div > div:nth-of-type(3) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    width: 100px;
    height: 30px;
    border-radius: 10px;
  }
  div > div:nth-of-type(1) > div > div:nth-of-type(4) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-size: 1.4rem;
  }
  #x-box-icon_modify_modal_box {
    color: rgba(78, 115, 223, 1);
  }
  #x-box-icon_modify_modal_box:hover {
    color: red;
  }
`;
