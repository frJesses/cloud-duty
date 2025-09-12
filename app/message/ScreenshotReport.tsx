import CustomFlatList from "@/components/common/CustomFlatList";
import Layout from "@/layout";
import { View, Text } from "react-native";
import { getNotifyMessage } from "@/api/message";
import type { ListRenderItemInfo } from "@shopify/flash-list";
import Card from "@/components/common/Card";
import dayjs from "dayjs";
import { formatTimeToStr } from "@/utils/timeUtils";
import { useLocalSearchParams } from "expo-router";
import SmartImage from "@/components/common/SmartImage";

export default function ScreenshotReport() {
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
        <Card
          title="截图报备"
          pressCallback={() => {
            console.log("clcik");
          }}
        >
          <View className="flex flex-col gap-2">
            <Text className="t-primary text-base">{item.storeName}</Text>
            <View className="flex flex-row items-start">
              <Text className="t-primary text-base">报备内容:&nbsp;</Text>
              <Text className="flex-1 t-primary text-base">{item.alert}</Text>
            </View>
            <Text className="t-primary text-base">
              报备时间:&nbsp;
              {dayjs(item.happenTime).format("YYYY-MM-DD HH:mm:ss")}
            </Text>
            <View className="rounded-lg overflow-hidden w-full aspect-video">
              <SmartImage
                src={item.reportImg}
                imageStyle={{ width: "100%", aspectRatio: "16 / 9" }}
              />
            </View>
          </View>
        </Card>
      </View>
    );
  }

  return (
    <Layout title="截图报备">
      <View className="h-full">
        <CustomFlatList<Api.Response.DutyReport>
          loadData={loadData}
          renderItem={renderItem}
        />
      </View>
    </Layout>
  );
}
