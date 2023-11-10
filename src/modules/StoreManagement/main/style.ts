import styled from "styled-components";

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div:nth-child(1) {
    margin-top: 30px;
  }
  /* 컨테이너 */
  > div:nth-child(3) {
    width: 84%;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #f0f0f0;
  }
  /* 주문현황 컨테이너*/
  div:nth-child(3) > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding-top: 30px;
    border-radius: 10px;
    flex: 1;
    margin-right: 10px;
    text-align: center;
  }
  > div:nth-child(3) strong {
    font-size: 3.5rem;
  }
  /* 주문현황 */
  div:nth-child(3) > div:nth-child(1) > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  /* 주문성공 실패 컨테이너 */
  div:nth-child(3) > div:nth-child(1) > div:nth-child(2) {
    display: flex;
    margin-top: 30px;
    justify-content: space-evenly;
    flex-direction: row;
  }
  /* 주문 성공 */
  div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) {
    display: flex;
    height: 200px;
    flex-direction: column;
  }
  /* 주문 성공 숫자 띄우는 곳 */
  div:nth-child(3)
    > div:nth-child(1)
    > div:nth-child(2)
    > div:nth-child(1)
    > div:nth-child(1) {
    width: 100px;
    height: 100px;
    margin-top: 20px;
  }
  div:nth-child(3)
    > div:nth-child(1)
    > div:nth-child(2)
    > div:nth-child(1)
    > p {
    background-color: rgba(65, 234, 212, 0.5);
    padding: 7px;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  /* 주문 실패 */
  div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) {
    display: flex;
    height: 200px;
    flex-direction: column;
  }
  div:nth-child(3)
    > div:nth-child(1)
    > div:nth-child(2)
    > div:nth-child(2)
    > p {
    background-color: rgba(230, 170, 206, 0.5);
    padding: 7px;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  div:nth-child(3)
    > div:nth-child(1)
    > div:nth-child(2)
    > div:nth-child(2)
    > div:nth-child(1) {
    width: 100px;
    height: 100px;
    margin-top: 20px;
  }
  /* 제품 현황--------------------------------------------- */
  > div:nth-child(3) > div:nth-child(2) {
    display: flex;
    background-color: white;
    padding-top: 30px;
    border-radius: 10px;
    flex-direction: column;
    margin-left: 10px;
    text-align: center;
    flex: 1;
  }
  /* 제품 현황 */
  div:nth-child(3) > div:nth-child(2) > div:nth-child(1) {
  }
  div:nth-child(3) > div:nth-child(2) > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 30px;
  }
  div:nth-child(3)
    > div:nth-child(2)
    > div:nth-child(2)
    > div:nth-child(1)
    > p {
    background-color: rgba(243, 223, 191, 0.5);
    border-radius: 10px;

    padding: 7px;
    margin-bottom: 30px;
  }
  div:nth-child(3)
    > div:nth-child(2)
    > div:nth-child(2)
    > div:nth-child(2)
    > p {
    background-color: rgba(255, 229, 72, 0.5);
    border-radius: 10px;

    padding: 7px;
    margin-bottom: 30px;
  }
  div:nth-child(3)
    > div:nth-child(2)
    > div:nth-child(2)
    > div:nth-child(3)
    > p {
    background-color: rgba(43, 151, 32, 0.5);
    border-radius: 10px;

    padding: 7px;
    margin-bottom: 30px;
  }
`;
