import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getStoreList, getStoreInfomation } from "@/api/store";
import { getCurrentUser } from "@/api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CommonStore {
  storeList: Api.Response.StoreItem[];
  currentStore: Api.Response.StoreItem | null;
  currentUser: Api.Response.CurrentUser | null;
  config: Api.Response.ReturnInfo | null;
  fetchStorePage: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  fetchConfig: () => Promise<void>;
  setCurrentStore: (store: Api.Response.StoreItem | null) => void;
}

export const useCommonStore = create<CommonStore>()(
  persist(
    (set) => ({
      storeList: [],
      currentStore: null,
      currentUser: null,
      config: null,
      setCurrentStore: (newStore = null) => {
        set({ currentStore: newStore });
      },
      fetchStorePage: async () => {
        try {
          const data = await getStoreList({ page: 0, size: 1000 });
          set({ storeList: data || [] });
        } catch (err) {
          set({ storeList: [] });
        }
      },
      fetchCurrentUser: async () => {
        try {
          const data = await getCurrentUser();
          set({ currentUser: data });
        } catch (err) {
          set({ currentUser: null });
        }
      },
      fetchConfig: async () => {
        try {
          const res = await getStoreInfomation();
          set({ config: res || null });
        } catch {
          set({ config: null });
        }
      },
    }),
    {
      name: "currentStore",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentStore: state.currentStore,
        currentUser: state.currentUser,
      }),
    }
  )
);

export const useCurrentStore = () =>
  useCommonStore((state) => state.currentStore);
