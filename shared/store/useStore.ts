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

interface ListStore {
  chosenList: string;
  setChosenList: (list: string) => void;
}

type ModalState = {
  loading: boolean;
  success: boolean;
  setLoading: (val: boolean) => void;
  setSuccess: (val: boolean) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  loading: false,
  success: false,
  setLoading: (val) => set({ loading: val }),
  setSuccess: (val) => set({ success: val }),
}));

export const useTopicStore = create<TopicStore>((set) => ({
  chosenTopic: "",
  setChosenTopic: (topic) => set({ chosenTopic: topic }),
}));

export const useTranslatorStore = create<TranslatorStore>((set) => ({
  selectedTranslator: null,
  setSelectedTranslator: (translator) => set({ selectedTranslator: translator }),
}));

export const useListStore = create<ListStore>((set) => ({
  chosenList: "",
  setChosenList: (list) => set({ chosenList: list }),
}));
