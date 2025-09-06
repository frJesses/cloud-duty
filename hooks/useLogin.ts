import { useCommonStore, useCurrentStore } from "@/store/modules/common";
import { useRouter } from "expo-router";
import { Toast } from "native-base";

export function useLogin() {
  const router = useRouter();
  const { fetchStorePage, setCurrentStore, fetchCurrentUser } =
    useCommonStore();
  const currentStore = useCurrentStore();

  async function handleLogin() {
    await fetchStorePage();
    const list = useCommonStore.getState().storeList;
    if (list?.length === 0) {
      Toast.show({
        title: "门店配置错误",
        duration: 2000,
      });
      router.replace("/login");
      return;
    }
    // 获取当前用户信息
    await fetchCurrentUser();
    const isExist = list.find(
      (item: Api.Response.StoreItem) => item.key === currentStore?.key
    );
    if (!currentStore || !isExist) {
      setCurrentStore(list[0]);
    } else {
      setCurrentStore(currentStore);
      router.replace("/(tabs)/home");
    }
  }

  return { handleLogin };
}
