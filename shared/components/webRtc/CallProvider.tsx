import { useEffect, useRef, useState } from "react";
import { CallContext, type CallStatus, type CallPayload } from "./useCall";
import { createStomp } from "./StompClient";

type Props = {
  children: React.ReactNode;
  role: "USER" | "TRANSLATOR";
  wsUrl: string;
  token: string;
};

export function CallProvider({ children, role, wsUrl, token }: Props) {
  const stompRef = useRef<ReturnType<typeof createStomp> | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [incomingCall, setIncomingCall] = useState<CallPayload | null>(null);
  const [currentCall, setCurrentCall] = useState<CallPayload | null>(null);

  useEffect(() => {
    const client = createStomp(wsUrl, token);
    stompRef.current = client;

    const unsubs: Array<() => void> = [];

    client.onConnect = () => {
      // TRANSLATOR слушает входящие
      if (role === "TRANSLATOR") {
        const sIncoming = client.subscribe("/user/queue/incoming-call", (msg) => {
          const call = JSON.parse(msg.body) as CallPayload;
          setIncomingCall(call);
          setCallStatus("ringing");
        });
        unsubs.push(() => sIncoming.unsubscribe());
      }

      // Общее для обеих ролей
      const sStarted = client.subscribe("/user/queue/call-started", (msg) => {
        const call = JSON.parse(msg.body) as CallPayload;
        setCurrentCall(call);
        setIncomingCall(null);
        setCallStatus("in-call");
      });

      const sRejected = client.subscribe("/user/queue/call-rejected", () => {
        setCallStatus("rejected");
        setIncomingCall(null);
        setCurrentCall(null);
      });

      const sEnded = client.subscribe("/user/queue/call-ended", () => {
        setCallStatus("ended");
        setIncomingCall(null);
        setCurrentCall(null);
      });

      const sTimeout = client.subscribe("/user/queue/call-timeout", () => {
        setCallStatus("timeout");
        setIncomingCall(null);
        setCurrentCall(null);
      });

      unsubs.push(
        () => sStarted.unsubscribe(),
        () => sRejected.unsubscribe(),
        () => sEnded.unsubscribe(),
        () => sTimeout.unsubscribe(),
      );
    };

    client.onStompError = (frame) => {
      console.error("[STOMP ERROR]", frame.headers["message"], frame.body);
    };
    client.onWebSocketError = (ev) => {
      console.error("[WS ERROR]", ev);
    };

    client.activate();

    return () => {
      unsubs.forEach((u) => {
        try {
          u();
        } catch {}
      });
      try {
        client.deactivate();
      } catch {}
      stompRef.current = null;
    };
  }, [role, wsUrl, token]);

  // Экшены
  const acceptCall = () => {
    if (!incomingCall || !stompRef.current) return;
    stompRef.current.publish({
      destination: "/app/call/accept",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ callId: incomingCall.callId }),
    });
  };

  const rejectCall = () => {
    if (!incomingCall || !stompRef.current) return;
    stompRef.current.publish({
      destination: "/app/call/reject",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ callId: incomingCall.callId }),
    });
    setCallStatus("rejected");
    setIncomingCall(null);
  };

  const endCall = () => {
    if (!currentCall || !stompRef.current) return;
    stompRef.current.publish({
      destination: "/app/call/end",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ callId: currentCall.callId }),
    });
    // оптимистично чистим UI
    setCallStatus("ended");
    setCurrentCall(null);
    setIncomingCall(null);
  };

  // пользователь инициировал звонок (после POST /call/create)
  const markCalling = (
    call: CallPayload | { callId: number; callerId: number; translatorId: number },
  ) => {
    setCurrentCall(call as CallPayload);
    setIncomingCall(null);
    if (role === "USER") setCallStatus("calling");
  };

  return (
    <CallContext.Provider
      value={{
        callStatus,
        incomingCall,
        currentCall,
        acceptCall,
        rejectCall,
        endCall,
        markCalling,
      }}
    >
      {children}
    </CallContext.Provider>
  );
}
