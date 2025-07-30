import { useState } from "react";
import { CallContext, type CallInfo, type CallStatus } from "./useCall";

export const CallProvider = ({ children }: { children: React.ReactNode }) => {
  const [incomingCall, setIncomingCall] = useState<CallInfo | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>(null);

  return (
    <CallContext.Provider
      value={{ incomingCall, callStatus, setIncomingCall, setCallStatus }}
    >
      {children}
    </CallContext.Provider>
  );
};
