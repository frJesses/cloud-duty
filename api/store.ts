import HYRequest from "@/utils/request";

export function getStoreList(data?: Api.Request.StorePage) {
  return HYRequest.get({
    url: "/api/merchant/stores",
    params: data,
  });
}
