import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  width: 90%;
  height: 100vh;
  display: flex;
  flex-direction: row;

  #LayoutWrapper {
    flex: 0.15;
    /* position: relative; */
    background-color: #202123;
    padding-left: 20px;
    padding-right: 20px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  main {
    flex: 0.85;
    background-color: #f0f0f0;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 7px solid #202123;
  }

  #LayoutWrapper ul li {
    // 클릭했을때 나오는 nav
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
    font-size: 1.2rem;
    background-color: rgba(67, 67, 67, 0.4);
    padding-left: 15px;
    padding-top: 7px;
    padding-bottom: 6px;
    border-radius: 10px;
    margin-left: 10px;
    transform: scale(1);
  }
  #LayoutWrapper ul li :hover {
    transition: background-color 0.2s, transform 0.1s;
    transform-origin: left;
    transform: scale(1.2);
  }
  #LayoutWrapper ul li p {
    color: white;
  }
  #LayoutWrapper div {
    margin-top: 15px;
  }
  #LayoutWrapper h2 {
    // 가게 관리 / 고객 관리 틀
    color: white;
    padding: 5px;
    border-radius: 10px;
    background-color: rgba(78, 115, 223, 1);
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    transform: scale(1);
    font-size: 1.2rem;
  }
  #LayoutWrapper h2:hover {
    background-color: #83bcff;
    transition: background-color 0.2s, transform 0.1s;
    transform: scale(1.1);
  }
  #LayoutWrapper h1 {
    color: white;
  }
  input {
    background-color: white;
    outline: none;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 3px;
  }
  input:focus {
    box-shadow: rgba(5, 102, 214, 0.4) 0px 0px 10px 1px;
    border: 1px solid gray;
  }
  textarea {
    background-color: white;
    outline: none;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 3px;
  }
  textarea:focus {
    box-shadow: rgba(5, 102, 214, 0.4) 0px 0px 10px 1px;
  }
  button {
    border: 0px;
    background-color: rgba(78, 115, 223, 1);
    color: white;
    transform: scale(1);
    font-family: "CuteFont-Regular";
    font-size: 1.4rem;
  }
  button:hover {
    background-color: #83bcff;
    transition: background-color 0.2s, transform 0.1s;
    transform: scale(1.05);
  }
  select {
    padding: 3px;
    border-radius: 7px;
    border: none;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
      rgba(9, 30, 66, 0.13) 0px 0px 1px 1.1px;
  }
`;
