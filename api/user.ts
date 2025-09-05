import HYRequest from "@/utils/request";

/**
 * 注册、刷新
 * @param data
 * @returns
 */
export function signup(data?: Api.Request.SignParams) {
  return HYRequest.post({
    url: "/users/signinup",
    data,
  });
}

/**
 * 校验用户是否存在
 * @param phone 手机号
 * @returns
 */
export function validUserExist(phone: string) {
  return HYRequest.get({
    url: "/users/exists",
    params: {
      phone,
    },
  });
}

/**
 * 发送验证码
 * @param phone 手机号
 * @returns
 */
export function sendSms(phone: string) {
  return HYRequest.post({
    url: "/users/sendsms",
    data: { phone },
  });
}
