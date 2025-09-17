import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function createStomp() {
  const client = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    connectHeaders: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
    reconnectDelay: 4000,
  });
  return client;
}
