import { create } from "zustand";

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
