import { useEffect, useState } from "react";
import { Container, ItemContainer, Wrapper } from "./style";

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
      <Container>
        {messages.map((productId, index) => (
          <ItemContainer key={index}>
            제품ID{productId}번이 재고 부족으로 주문 거절되었습니다.
          </ItemContainer>
        ))}
      </Container>
    </Wrapper>
  );
};

export default OrderNotification;
