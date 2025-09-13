import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function createStomp() {
  const token = localStorage.getItem("token") || "";
  const wsPath = ` http://localhost:8080/ws?token=${encodeURIComponent(token)}`;

  const client = new Client({
    webSocketFactory: () => new SockJS(`${wsPath}`),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 4000,
  });
  return client;
}
