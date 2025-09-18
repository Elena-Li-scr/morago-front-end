import { createContext, useContext } from "react";

type BalanceContextType = {
  balance: string;
  setBalance: (b: number) => void;
};

export const BalanceContext = createContext<BalanceContextType | undefined>(undefined);
export const useBalance = () => {
  const ctx = useContext(BalanceContext);
  if (!ctx) throw new Error("useBalance должен использоваться внутри BalanceProvider");
  return ctx;
};
