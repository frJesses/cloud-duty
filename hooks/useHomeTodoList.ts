import { useState } from "react";
import { getStoreEmergencyContact, getStoreInfomation } from "@/api/store";
import { getStorageStore } from "@/utils/tools";
import { getInternalGoods } from "@/api/goods";
import { useCommonStore } from "@/store";

export interface Result {
  name: string;
  callBack: () => Promise<void>;
  showCallback: () => Promise<boolean>;
  key: string;
  showMenu: boolean;
}

/**
 * 代办组件：
 * 1. 紧急联系人
 * 2. 服务费
 * 3. 完善地址
 * 4. 亮灯提示
 * 5. 退换货提示
 * 6. 商品建档提醒
 */
export function useHomeToDoList() {
  const { fetchConfig } = useCommonStore();
  const [result, setResult] = useState<Result[]>([]);
  const TASK_LIST: Result[] = [
    {
      name: "填写紧急联系人电话",
      callBack: handleEmergencyClick,
      showCallback: showEmergencyContact,
      key: "emergency",
      showMenu: false,
    },
    {
      name: "服务费余额不足，请尽快充值",
      callBack: handlePrepaid,
      showCallback: showServerFee,
      key: "fee",
      showMenu: false,
    },
    {
      name: "完善门店信息",
      callBack: handleEmergencyClick,
      showCallback: showAddress,
      key: "address",
      showMenu: false,
    },
    {
      name: "亮灯确认提示",
      callBack: handleEmergencyClick,
      showCallback: showLight,
      key: "light",
      showMenu: false,
    },
    {
      name: "商品未建档，请及时建档",
      callBack: handleEmergencyClick,
      showCallback: showInternal,
      key: "internalGoods",
      showMenu: false,
    },
  ];
  const [isLoaded, setIsLoaded] = useState(false);

  // 紧急联系人
  async function showEmergencyContact() {
    const res = await getStoreEmergencyContact();
    return !res || res.length === 0;
  }

  async function handleEmergencyClick() {}

  // 服务费
  async function showServerFee() {
    const currentUser =
      await getStorageStore<Api.Response.CurrentUser>("currentUser");
    return [1, 2].includes(currentUser?.prepaidAccountState);
  }

  async function handlePrepaid() {}

  // 完善门店信息
  async function showAddress() {
    const currentStore = await getStorageStore<Api.Response.StoreItem>();
    return !currentStore?.isValidAddress;
  }

  // 亮灯确认提示
  async function showLight() {
    await fetchConfig();
    const { config } = useCommonStore.getState();
    return Boolean(config?.useShelfLight && config?.noShelfLightCount > 0);
  }

  // 商品未建档
  async function showInternal() {
    const res = await getInternalGoods();
    return res?.length > 0;
  }

  // 执行堆栈中的任务
  async function runTask() {
    setIsLoaded(false);
    let task = await Promise.allSettled(
      TASK_LIST.map(async (item) => {
        item.showMenu = await item.showCallback();
        return item;
      })
    );
    const result = task
      .filter((item) => item.status === "fulfilled")
      .map((item) => item.value)
      .filter((item) => item.showMenu);
    setIsLoaded(true);
    setResult(result);
  }

  return { runTask, result, isLoaded };
}
