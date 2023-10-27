import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  width: 90%;
  height: 100vh;
  display: flex;
  flex-direction: row;

  #LayoutWrapper {
    flex: 0.15;
    background-color: #202123;
    padding-left: 20px;
    padding-right: 20px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  main {
    flex: 0.85;
    background-color: #e0e0e0;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  #LayoutWrapper ul li {
    // 클릭했을때 나오는 nav
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    font-size: 0.8rem;
    background-color: rgba(67, 67, 67, 0.4);
    padding-left: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    margin-left: 10px;
    transform: scale(1);
  }
  #LayoutWrapper ul li :hover {
    transition: background-color 0.2s, transform 0.1s;
    transform-origin: left;
    transform: scale(1.09);
  }
  #LayoutWrapper ul li p {
    color: white;
  }
  #LayoutWrapper div {
    margin-top: 25px;
  }
  #LayoutWrapper h2 {
    // 가게 관리 / 고객 관리 틀
    color: white;
    padding: 5px;
    border-radius: 10px;
    background-color: rgba(110, 194, 226, 0.8);
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    transform: scale(1);
    font-size: 0.9rem;
  }
  #LayoutWrapper h2:hover {
    background-color: rgba(44, 77, 90, 0.7);
    transition: background-color 0.2s, transform 0.1s;
    transform: scale(1.1);
  }
  #LayoutWrapper h1 {
    color: white;
  }
`;
