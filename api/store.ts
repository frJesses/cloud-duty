import HYRequest from "@/utils/request";
import { getStorageStore } from "@/utils/tools";

export function getStoreList(data?: Api.Request.StorePage) {
  return HYRequest.get({
    url: "/api/merchant/stores",
    params: data,
  });
}

export async function getStoreEmergencyContact() {
  const store = await getStorageStore();
  return HYRequest.get<string[]>({
    url: `/api/merchant/stores/getEmergencyContact/${store?._id}`,
  });
}

export async function getStoreInfomation() {
  const store = await getStorageStore();
  return HYRequest.get<Api.Response.ReturnInfo>({
    url: `/api/merchant/goodsCategory/returnInfo?storeKey=${store.key}`,
  });
}

export async function getInspectionData(data: Api.Request.Inspection) {
  return HYRequest.post({
    url: `/api/merchant/inspection/queryInspections`,
    data,
  });
}

export async function getStoreMonitorDevices() {
  return HYRequest.get<Api.Response.MonitorItem[]>({
    url: "/api/merchant/hkvs/devices",
  });
}
