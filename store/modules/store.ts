import { create } from "zustand";

interface UserState {
  name: string;
  setName: (name: string) => void;
}

export const useAppStore = create<UserState>((set) => ({
  name: "这是store中的名称",
  setName: (name) => set({ name }),
}));
