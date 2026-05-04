import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function useWebSocket2() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8082/ws"),
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("connected");

        client.subscribe("/topic/strange-txn", (msg) => {
          const data = JSON.parse(msg.body);
          //把資料加入新陣列中
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
