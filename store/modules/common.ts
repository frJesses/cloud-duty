import { create } from "zustand";
import { getStoreList } from "@/api/store";
import { Toast } from "native-base";
import Storage from "@/utils/cache";
import { StorageKey } from "@/constants/storage";

interface CommonStore {
  storeList: Api.Response.StoreItem[];
  fetchStorePage: () => Promise<void>;
  currentStore: Api.Response.StoreItem | null;
  setCurrentStore: (store: Api.Response.StoreItem | null) => void;
}

export const useCommonStore = create<CommonStore>((set) => ({
  storeList: [],
  currentStore: null,
  setCurrentStore: (newStore = null) => {
    set({ currentStore: newStore });
  },
  fetchStorePage: async () => {
    try {
      const data = await getStoreList({ page: 0, size: 1000 });
      set({ storeList: data || [] });
    } catch (err) {
      set({ storeList: [], currentStore: null });
    }
  },
}));
