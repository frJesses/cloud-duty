import HYRequest from "@/utils/request";

export async function getMessageList() {
  return HYRequest.get<Api.Response.Message[]>({
    url: "/api/merchant/stores/notifyMessage/getUnReadMessageCountByType",
  });
}

export async function getNotifyMessage(params: Api.Request.NotifyParams) {
  return HYRequest.get({
    url: "/api/merchant/stores/notifyMessage/getNotifyMessage",
    params,
  });
}
