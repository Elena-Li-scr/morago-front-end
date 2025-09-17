import { createContext, useContext } from "react";

export type CallPayload = {
  callId: string;
  fromUserId: string;
  toUserId: string;
  theme: string;
  photoUrl: string;
  costPerMinute: string;
};

export type CallStatus = "idle" | "ringing" | "in-call" | "rejected" | "ended";

type CallContextType = {
  incomingCall: CallPayload | null; // для модалки «Принять/Отклонить»
  currentCall: CallPayload | null; // активный звонок (после принятия)
  callStatus: CallStatus;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
};

export const CallContext = createContext<CallContextType | undefined>(undefined);
export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
};
