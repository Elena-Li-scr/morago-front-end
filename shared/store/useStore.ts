import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TopicStore {
  chosenTopic: string;
  setChosenTopic: (topic: string) => void;
}
interface TopicStoreUrl {
  chosenTopicUrl: string;
  setChosenTopicUrl: (topic: string) => void;
}
interface TranslatorByTheme {
  id: string | number;
  nameWithInitials: string;
  levelOfKorean: number;
  imageUrl: null | string;
  theme: string;
}

interface TranslatorStore {
  selectedTranslator: TranslatorByTheme | null;
  setSelectedTranslator: (translator: TranslatorByTheme | null) => void;
}

interface ListStore {
  chosenList: string;
  setChosenList: (list: string) => void;
}
interface NoteStore {
  haveNewNote: boolean;
  setHaveNewNote: (val: boolean) => void;
}
interface Balance {
  lowBalance: boolean;
  setLowBalance: (val: boolean) => void;
}

interface Rating {
  showRating: boolean;
  setShowRating: (val: boolean) => void;
}

interface FirstCallStore {
  isFirstCall: boolean;
  setIsFirstCall: (val: boolean) => void;
}
interface TopicIdStore {
  chosenTopicId: string | number;
  setChosenTopicId: (topic: string | number) => void;
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

export const useTopicUrlStore = create<TopicStoreUrl>()(
  persist(
    (set) => ({
      chosenTopicUrl: "",
      setChosenTopicUrl: (v) => set({ chosenTopicUrl: v }),
    }),
    {
      name: "topic-url",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ chosenTopicUrl: s.chosenTopicUrl }),
    },
  ),
);

export const useTopicStore = create<TopicStore>()(
  persist(
    (set) => ({
      chosenTopic: "",
      setChosenTopic: (v) => set({ chosenTopic: v }),
    }),
    {
      name: "topic-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ chosenTopic: s.chosenTopic }),
    },
  ),
);

export const useIdTopicStore = create<TopicIdStore>()(
  persist(
    (set) => ({
      chosenTopicId: "",
      setChosenTopicId: (v) => set({ chosenTopicId: v }),
    }),
    {
      name: "topic-id-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ chosenTopicId: s.chosenTopicId }),
    },
  ),
);

export const useTranslatorStore = create<TranslatorStore>((set) => ({
  selectedTranslator: null,
  setSelectedTranslator: (translator) => set({ selectedTranslator: translator }),
}));

export const useListStore = create<ListStore>((set) => ({
  chosenList: "",
  setChosenList: (list) => set({ chosenList: list }),
}));

export const useNoteStore = create<NoteStore>((set) => ({
  haveNewNote: false,
  setHaveNewNote: (val) => set({ haveNewNote: val }),
}));

export const useFirstCall = create<FirstCallStore>((set) => ({
  isFirstCall: false,
  setIsFirstCall: (val) => set({ isFirstCall: val }),
}));

export const useLowBalance = create<Balance>((set) => ({
  lowBalance: false,
  setLowBalance: (val) => set({ lowBalance: val }),
}));

export const useShowRating = create<Rating>((set) => ({
  showRating: false,
  setShowRating: (val) => set({ showRating: val }),
}));
