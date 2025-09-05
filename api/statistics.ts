import HYRequest from "@/utils/request";
import Storage from "@/utils/cache";
import { StorageKey } from "@/constants/storage";

export async function getStatisticeData() {
  const params: { [key: string]: string } = {};
  const currentStore = await Storage.get(StorageKey.CURRENTSTORE);
  if (currentStore) {
    params.storeId = currentStore._id;
  }
  return HYRequest.get({
    url: "/api/merchant/statistics/today",
    params,
  });
}
