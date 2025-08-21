import { useEffect, useState } from "react";
import type { UserProfileExtra } from "../../types/types";

export const useTranslatorFromLocalStorage = () => {
  const [translatorProfile, setTranslatorProfile] = useState<UserProfileExtra | null>(null);

  useEffect(() => {
    const storeddata = localStorage.getItem("newTranslator");
    if (storeddata) {
      try {
        const parsed = JSON.parse(storeddata);
        setTranslatorProfile(parsed);
      } catch (e) {
        console.error("error JSON:", e);
      }
    }
  }, []);

  return translatorProfile;
};
