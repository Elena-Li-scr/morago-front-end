import { useState } from "react";
import { PopUpContext, type PopUpInfo, type PopUpStatus } from "./usePopUp";

export const PopUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [popUpData, setPopUpData] = useState<PopUpInfo | null>(null);
  const [popUpStatus, setPopUpStatus] = useState<PopUpStatus>(null);

  return (
    <PopUpContext.Provider value={{ popUpData, popUpStatus, setPopUpData, setPopUpStatus }}>
      {children}
    </PopUpContext.Provider>
  );
};
