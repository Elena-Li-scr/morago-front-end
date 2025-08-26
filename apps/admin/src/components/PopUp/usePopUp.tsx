import { createContext, useContext } from "react";

export type PopUpInfo = {
  id: number;
  name?: string;
  type: string;
  isActive?: boolean;
  role?: string;
  iconId?: number;
  categoryId?: number;
  isPopular?: boolean;
  firstName?: string;
  lastName?: string;
  phone?: string;
  balance?: number;
  hasDepositRequest?: boolean;
  email?: string;
  isOnline?: boolean;
  levelOfKorean?: number;
  dateOfBirth?: string;
  hasWithdrawalRequest?: boolean;
};

export type PopUpStatus = "open" | null;

type PopUpContextType = {
  popUpData: PopUpInfo | null;
  popUpStatus: PopUpStatus;
  setPopUpData: (info: PopUpInfo | null) => void;
  setPopUpStatus: (status: PopUpStatus) => void;
};

export const PopUpContext = createContext<PopUpContextType | undefined>(undefined);
export const usePopUp = () => {
  const context = useContext(PopUpContext);
  if (!context) {
    throw new Error("usePopUp must be used within a PopUpProvider");
  }
  return context;
};
