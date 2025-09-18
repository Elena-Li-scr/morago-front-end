import { createContext, useContext } from "react";

export type CallPayload = {
  callId: string;
  fromUserId: string;
  toUserId: string;
  theme: string;
  photoUrl: string;
  costPerMinute: string;
};

export type CallStatus =
  | "idle"
  | "ringing"
  | "calling"
  | "in-call"
  | "rejected"
  | "ended"
  | "timeout";
type CallContextType = {
  incomingCall: CallPayload | null; // для модалки «Принять/Отклонить»
  currentCall: CallPayload | null; // активный звонок (после принятия)
  callStatus: CallStatus;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  markCalling: (
    call: CallPayload | { callId: number; callerId: number; translatorId: number },
  ) => void;
};

export const CallContext = createContext<CallContextType>({
  callStatus: "idle",
  incomingCall: null,
  currentCall: null,
  acceptCall: () => {},
  rejectCall: () => {},
  endCall: () => {},
  markCalling: () => {},
});

export const useCall = () => useContext(CallContext);
