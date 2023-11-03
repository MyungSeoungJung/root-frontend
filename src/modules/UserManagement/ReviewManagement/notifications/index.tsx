import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useReviewContext } from "../reviewContext";
import { Review } from "../types";

const Notifications = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { setReviews } = useReviewContext();

  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    const socket = new SockJS("http://192.168.100.152:5500/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected to WebSocket");

        client.subscribe("/topic/review", (message) => {
          if (message.body) {
            const newReview: Review = JSON.parse(message.body);
            setReviews((prevReviews) => [...prevReviews, newReview]);
            setMessages((prevMessages) => [...prevMessages, message.body]);
            setModalVisible(true);

            setTimeout(() => {
              setModalVisible(false);
            }, 5000);
          }
        });
      },
    });

    setClient(client);
    client.activate();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      {isModalVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
          }}
        >
          <h4>New Review Added!</h4>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
