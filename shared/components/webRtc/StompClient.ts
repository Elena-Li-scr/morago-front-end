import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function createStomp(wsUrl: string, token: string) {
  const wsPath = `${wsUrl}?token=${encodeURIComponent(token)}`;

  const client = new Client({
    webSocketFactory: () => new SockJS(`${wsPath}`),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 4000,
  });
  return client;
}
