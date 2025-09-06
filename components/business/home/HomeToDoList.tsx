import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomBadge from "@/components/common/CustomBadge";
import Touch from "@/components/common/Touch";
import { useEffect, useState } from "react";
import { useHomeRefresh } from "./context/HomeContext";
import { getStoreEmergencyContact, getStoreInfomation } from "@/api/store";
import { getStorageStore } from "@/utils/tools";
import { getInternalGoods } from "@/api/goods";

interface Result {
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
export default function HomeToDoList() {
  const { refreshCount } = useHomeRefresh();
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
    const res = await getStoreInfomation();
    return res.useShelfLight && res.noShelfLightCount > 0;
  }

  // 商品未建档
  async function showInternal() {
    const res = await getInternalGoods();
    return res?.length > 0;
  }

  // 执行堆栈中的任务
  async function runTask() {
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
    setResult(result);
  }

  useEffect(() => {
    runTask();
  }, [refreshCount]);

  return (
    <View className="mt-4 p-4 bg-white rounded-lg flex flex-col gap-3">
      <View className="border-b-[1px] pb-2 border-dashed border-[#f5f5f5] flex flex-row items-center justify-between">
        <Text className="t-primary text-base">待办列表</Text>
        <Touch className="flex flex-row">
          <Text className="t-second">查看更多</Text>
          <Ionicons name="chevron-forward" size={18} color="#9E9E9E" />
        </Touch>
      </View>
      <ScrollView
        style={{ maxHeight: 100 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View className="flex flex-col gap-3">
          {result.map((item) => (
            <ToDoListItem {...item} key={item.key} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function ToDoListItem(props: Result) {
  const { name } = props;

  return (
    <View className="flex flex-row items-center gap-2 border-b-[1px] pb-2 border-dashed border-[#f5f5f5]">
      <CustomBadge borderColor="#FF6B6B" variant="outline">
        待办
      </CustomBadge>
      <Touch className="flex flex-row items-center flex-1">
        <Text className="flex-1 t-primary text-base" numberOfLines={1}>
          {name}
        </Text>
        <Ionicons name="chevron-forward" size={18} color="#9E9E9E" />
      </Touch>
    </View>
  );
}
