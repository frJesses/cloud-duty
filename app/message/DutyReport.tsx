import CustomFlatList from "@/components/common/CustomFlatList";
import Layout from "@/layout";
import { View, Text } from "react-native";
import { getNotifyMessage } from "@/api/message";
import type { ListRenderItemInfo } from "@shopify/flash-list";
import Card from "@/components/common/Card";
import dayjs from "dayjs";
import { formatTimeToStr } from "@/utils/timeUtils";
import { useLocalSearchParams } from "expo-router";

export default function DutyReport() {
  const params = useLocalSearchParams();

  async function loadData(page: number, size: number) {
    return await getNotifyMessage({
      page,
      size,
      type: params.type as Api.MessageType,
    });
  }

  function renderItem({ item }: ListRenderItemInfo<Api.Response.DutyReport>) {
    return (
      <View className="mb-3 flex flex-col gap-2">
        <Text className="text-base t-second text-center w-full">
          {formatTimeToStr(item.createdAt, true)}
        </Text>
        <Card title="客服报告">
          <View className="flex flex-col gap-2">
            <Text className="t-primary text-base">{item.storeName}</Text>
            <Text className="t-primary text-base">
              {item.is24HourUnmanned ? "开始时间" : "切换云值守"}:&nbsp;
              {dayjs(item.noHumanTime).format("MM-DD HH:mm:ss")}
            </Text>
            <Text className="t-primary text-base">
              {item.is24HourUnmanned ? "结束时间" : "切换有人"}:&nbsp;
              {dayjs(item.humanTime).format("MM-DD HH:mm:ss")}
            </Text>
            <Text className="t-primary text-base">
              值守时长:&nbsp;{item.duration}
            </Text>
            <Text className="t-primary text-base">
              订单数:&nbsp;{item.orderCount}
            </Text>
            <Text className="t-primary text-base">
              销售额:&nbsp;{item.saleTotal}
            </Text>
          </View>
        </Card>
      </View>
    );
  }

  return (
    <Layout title="客服报告">
      <View className="h-full">
        <CustomFlatList<Api.Response.DutyReport>
          loadData={loadData}
          renderItem={renderItem}
        />
      </View>
    </Layout>
  );
}
