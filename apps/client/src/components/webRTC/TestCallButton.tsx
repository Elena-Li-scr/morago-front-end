import { FiPhoneCall } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { createStomp } from "./stompClient";
import axios from "axios";

export const TestCallButton = () => {
  const stompRef = useRef<ReturnType<typeof createStomp> | null>(null);
  const [recipientId, setRecipientId] = useState(24);
  const [status, setStatus] = useState<"idle" | "ringing" | "accepted" | "rejected" | "timeout">(
    "idle",
  );

  const token = localStorage.getItem("token");
  useEffect(() => {
    const client = createStomp();
    client.onConnect = () => {
      // необязательные подписки, чтобы знать, что произошло с вызовом
      client.subscribe(`/user/queue/incoming-call`, () => setStatus("ringing"));
      client.subscribe("/user/queue/call-started", () => setStatus("accepted"));
      client.subscribe("/user/queue/call-rejected", () => setStatus("rejected"));
      client.subscribe("/user/queue/call-timeout", () => setStatus("timeout"));
    };

    client.activate();
    stompRef.current = client;
    return () => {
      client.deactivate();
    };
  }, []);

  const callUser = async () => {
    if (!stompRef.current || !recipientId) return;
    const payload = {
      recipientId,
      themeId: 25,
    };
    await axios.post("http://localhost:8080/call/create", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setStatus("ringing"); // локально показываем, что «дозваниваемся»
  };

  return (
    <button
      style={{
        position: "fixed",
        bottom: "15%",
        left: "0px",
        zIndex: "88",
      }}
      onClick={callUser}
    >
      <FiPhoneCall
        style={{
          width: "50px",
          height: "50px",
          background: "#3AB500",
          color: "#fff",
          padding: "10px",
          borderRadius: "50%",
        }}
      />
    </button>
  );
};
