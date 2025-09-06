import HYRequest from "@/utils/request";
import { getStorageStore } from "@/utils/tools";

export async function getInternalGoods(params?: Api.Request.Page) {
  const store = await getStorageStore();
  return HYRequest.get<Api.Response.InternalGoods[]>({
    url: "/api/merchant/stores/abnormal/sync/app/makeFileList",
    params: {
      ...params,
      storeKey: store.key,
    },
  });
}
