import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function useWebSocket() {
  const [messages, setMessages] = useState([]);

useEffect(() => {
  const client = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8082/ws"),
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("connected");

      client.subscribe("/topic/txn", (msg) => {
        const data = JSON.parse(msg.body);
        setMessages((prev) => [...prev, data]);
      });
    },
  });

  client.activate();

  return () => {
    client.deactivate(); // ⭐ 安全關閉
  };
}, []);
  return messages;
}