import { create } from "zustand";
import type { Translator } from "../../apps/client/src/types";

interface TopicStore {
  chosenTopic: string;
  setChosenTopic: (topic: string) => void;
}

interface TranslatorStore {
  selectedTranslator: Translator | null;
  setSelectedTranslator: (translator: Translator | null) => void;
}

export const useTopicStore = create<TopicStore>((set) => ({
  chosenTopic: "",
  setChosenTopic: (topic) => set({ chosenTopic: topic }),
}));

export const useTranslatorStore = create<TranslatorStore>((set) => ({
  selectedTranslator: null,
  setSelectedTranslator: (translator) =>
    set({ selectedTranslator: translator }),
}));
