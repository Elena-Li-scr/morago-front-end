import { createContext, useContext } from "react";

export type CallInfo = {
  name: string;
  topic: string;
  coins: number;
  photoUrl: string;
};

export type CallStatus = "incoming" | "active" | null;

type CallContextType = {
  incomingCall: CallInfo | null;
  callStatus: CallStatus;
  setIncomingCall: (info: CallInfo | null) => void;
  setCallStatus: (status: CallStatus) => void;
};

export const CallContext = createContext<CallContextType | undefined>(
  undefined
);
export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
};
