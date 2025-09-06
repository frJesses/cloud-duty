import { useCommonStore } from "@/store/modules/common";
import { useRouter } from "expo-router";
import { Toast } from "native-base";
import Storage from "@/utils/cache";
import { StorageKey } from "@/constants/storage";

export function useLogin() {
  const router = useRouter();
  const { fetchStorePage, setCurrentStore } = useCommonStore();

  async function handleLogin() {
    await fetchStorePage();
    const list = useCommonStore.getState().storeList;
    if (!list || list.length === 0) {
      Toast.show({
        title: "门店配置错误",
        duration: 2000,
      });
      router.replace("/login");
      return;
    }
    let currentStore = await Storage.get<Api.Response.StoreItem>(
      StorageKey.CURRENTSTORE
    );
    const isExist = list.find(
      (item: Api.Response.StoreItem) => item.key === currentStore?.key
    );
    if (!currentStore || !isExist) {
      currentStore = list[0];
    }
    setCurrentStore(currentStore);
    await Storage.set(StorageKey.CURRENTSTORE, currentStore);
    router.replace("/(tabs)/home");
  }

  return { handleLogin };
}
