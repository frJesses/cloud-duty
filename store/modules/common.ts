import { create } from "zustand";
import { getStoreList } from "@/api/store";
import { Toast } from "native-base";
import Storage from "@/utils/cache";
import { StorageKey } from "@/constants/storage";

interface CommonStore {
  storeList: Api.Response.StoreItem[];
  fetchStorePage: () => Promise<void>;
  currentStore: Api.Response.StoreItem | null;
}

export const useCommonStore = create<CommonStore>((set) => ({
  storeList: [],
  currentStore: null,
  fetchStorePage: async () => {
    try {
      const data = await getStoreList({ page: 0, size: 1000 });
      if (!data || data.length === 0) {
        Toast.show({
          title: "门店配置错误",
          duration: 2000,
        });
        return;
      }
      let currentStore = await Storage.get<Api.Response.StoreItem>(
        StorageKey.CURRENTSTORE
      );
      const isExist = data.find(
        (item: Api.Response.StoreItem) => item.key === currentStore?.key
      );
      if (!currentStore || !isExist) {
        currentStore = data[0];
      }
      set({ storeList: data || [], currentStore });
    } catch (err) {
      set({ storeList: [], currentStore: null });
    }
  },
}));
