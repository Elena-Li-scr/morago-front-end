import { create } from "zustand";

interface TopicStore {
  chosenTopic: string;
  setChosenTopic: (topic: string) => void;
}

export const useTopicStore = create<TopicStore>((set) => ({
  chosenTopic: "",
  setChosenTopic: (topic) => set({ chosenTopic: topic }),
}));
