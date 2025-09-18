import { useEffect, useState } from "react";
import { BalanceContext } from "./useBalance";
import { getBalance } from "@shared/services/clientApi";

export const BalanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState(0); // можно потом обновлять из API

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const result = await getBalance();
        const formatSum = result.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setBalance(formatSum);
      } catch (err) {
        console.error("Не удалось загрузить баланс", err);
      }
    };
    fetchBalance();
  }, [balance]);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>{children}</BalanceContext.Provider>
  );
};
