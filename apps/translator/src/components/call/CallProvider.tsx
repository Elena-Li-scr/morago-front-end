import { useState, useEffect, useRef } from "react";
import { CallContext, type CallPayload, type CallStatus } from "./useCall";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { auth } from "../../utils/auth";

export const CallProvider = ({ children }: { children: React.ReactNode }) => {
  const stompRef = useRef<Client | null>(null);
  const [incomingCall, setIncomingCall] = useState<CallPayload | null>(null);
  const [currentCall, setCurrentCall] = useState<CallPayload | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");

  const token = auth.isAuthenticated() || "";

  const wsPath = `http://localhost:8080/ws?token=${encodeURIComponent(token)}`;

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${wsPath}`),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
    });
    stompRef.current = client;
    client.onConnect = () => {
      client.subscribe(`/user/queue/incoming-call`, (msg) => {
        console.log(msg.body);
        const call = JSON.parse(msg.body) as CallPayload;
        setIncomingCall(call);
        setCallStatus("ringing");
      });

      client.subscribe("/app/whoami", (msg) => {
        console.log("Ответ от сервера:", msg.body);
      });

      client.subscribe("/user/queue/call-started", (msg) => {
        const call = JSON.parse(msg.body) as CallPayload;
        setCurrentCall(call);
        setIncomingCall(null);
        setCallStatus("in-call");
      });

      client.subscribe("/user/queue/call-rejected", () => {
        setCallStatus("rejected");
        setIncomingCall(null);
      });

      client.subscribe("/user/queue/call-ended", () => {
        setCallStatus("ended");
        setCurrentCall(null);
        setIncomingCall(null);
        document.body.style.overflow = "auto";
      });

      client.subscribe("/user/queue/call-timeout", () => {
        console.log(5);
        setCallStatus("ended");
        setIncomingCall(null);
        document.body.style.overflow = "auto";
      });
    };

    client.activate();
    stompRef.current = client;
    return () => {};
  }, []);

  const acceptCall = () => {
    if (!incomingCall || !stompRef.current) return;

    stompRef.current.publish({
      destination: "/app/call/accept",
      body: JSON.stringify(incomingCall),
    });
    document.body.style.overflow = "hidden";
  };

  const rejectCall = () => {
    if (!incomingCall || !stompRef.current) return;
    stompRef.current.publish({
      destination: "/app/call/reject",
      body: JSON.stringify(incomingCall),
    });
    setIncomingCall(null);
    setCallStatus("rejected");
  };

  const endCall = () => {
    if (!currentCall || !stompRef.current) return;
    stompRef.current.publish({
      destination: "/app/call/end",
      body: JSON.stringify({ callId: currentCall.callId }),
    });

    // ждём /call-ended, но на всякий случай сразу чистим UI
    setCallStatus("ended");
    setCurrentCall(null);
    document.body.style.overflow = "auto";
  };

  return (
    <CallContext.Provider
      value={{ incomingCall, currentCall, callStatus, acceptCall, rejectCall, endCall }}
    >
      {children}
    </CallContext.Provider>
  );
};
