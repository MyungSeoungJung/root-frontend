import styled from "@emotion/styled";

export const Wrapper = styled.div`
  /* position: absolute; */
  bottom: 8px;
  font-size: 10px;
  margin-right: 10px;

  #notificationBell {
    font-size: 18px;
    position: absolute;
    margin-left: 3px;
    margin-top: -3px;
    color: rgba(78, 115, 223, 1);
  }
`;

export const Container = styled.ul`
  list-style: none;
  padding: 10px;
  /* background-color: black; */
  /* background-color: #202123; */
  background-color: rgba(0, 0, 0, 0.3);
  max-height: 90px;
  overflow-y: auto;
  width: 100%;
  height: 90px;
  scrollbar-width: thin; /* Firefox스크롤 바 너비 조절 */
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤 바 숨김 */
  &::-webkit-scrollbar {
    width: 6px; /* Chrome 및 Safari에 대한 스크롤 바 너비 조절 */
  }
  border-radius: 10px;
`;

export const ItemContainer = styled.li`
  margin: 0;
  padding: 10px;
`;
