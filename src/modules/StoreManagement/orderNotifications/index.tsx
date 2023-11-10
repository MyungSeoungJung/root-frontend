import { useEffect, useState } from "react";
import { Container, ItemContainer, Wrapper } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const OrderNotification = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://192.168.100.151:8080/order/notifications"
    );

    eventSource.onmessage = (event) => {
      const eventData = event.data;

      if (eventData !== "connected") {
        // JSON.parse를 사용하여 객체로 변환한 후 productId 추출
        try {
          const parsedData = JSON.parse(eventData);
          const productId = parsedData.productId;
          setMessages((prevMessages) => [...prevMessages, productId]);
        } catch (error) {
          console.error("JSON 파싱 오류:", error);
        }

        // 또는 정규식을 사용하여 productId 추출
        // const match = eventData.match(/"productId":(\d+)/);
        // if (match) {
        //   const productId = match[1];
        //   setMessages((prevMessages) => [...prevMessages, productId]);
        // }
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <Wrapper>
      <FontAwesomeIcon icon={faBell} id="notificationBell" />{" "}
      <p style={{ marginLeft: "25px", color: "white", fontSize: "1.1rem" }}>
        주문 알리미
      </p>
      <Container>
        {messages.map((message, index) => (
          <ItemContainer key={index} style={{ backgroundColor: "white" }}>
            제품 ID: {message}번의 주문알림!
          </ItemContainer>
        ))}
      </Container>
    </Wrapper>
  );
};

export default OrderNotification;
