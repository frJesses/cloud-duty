import Storage from "@/utils/cache";
import { StorageKey } from "@/constants/storage";

interface Store {
  state: {
    currentStore: Api.Response.StoreItem;
    currentUser: Api.Response.CurrentUser;
  };
  version: number;
}

/**
 * 获取zustand存储本地的值
 * @returns 当前门店对象
 */
export async function getStorageStore<T = Api.Response.StoreItem>(
  valueKey = "currentStore",
  storeKey = StorageKey.CURRENTSTORE
): Promise<T> {
  const store = await Storage.get<Store>(storeKey);
  return store?.state?.[valueKey as keyof typeof store.state] as T;
}
