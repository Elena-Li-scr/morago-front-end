import { create } from "zustand";

interface TopicStore {
  chosenTopic: string;
  setChosenTopic: (topic: string) => void;
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

export const useTopicStore = create<TopicStore>((set) => ({
  chosenTopic: "",
  setChosenTopic: (topic) => set({ chosenTopic: topic }),
}));

export const useIdTopicStore = create<TopicIdStore>((set) => ({
  chosenTopicId: "",
  setChosenTopicId: (topic) => set({ chosenTopicId: topic }),
}));

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
  isFirstCall: true,
  setIsFirstCall: (val) => set({ isFirstCall: val }),
}));
