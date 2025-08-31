import SearchBar from "@/components/common/SearchBar";
import Layout from "@/layout";
import { ScrollView, Text, View } from "react-native";
import PullToRefresh from "@/components/common/PullToRefresh";
import { Badge } from "native-base";

export default function SelectStore() {
  return (
    <Layout title="选择店铺">
      <View className="h-full flex flex-col">
        <View className="my-3">
          <SearchBar />
        </View>
        <PullToRefresh onRefresh={() => {}}>
          <ScrollView className="h-full bg-white">
            {new Array(15).fill(true).map((item, index) => (
              <View
                className="px-4 py-3 border-b-[1px] border-[#f5f5f5] flex flex-col gap-3 "
                key={index}
              >
                <View className="flex flex-row items-center gap-3">
                  <Text className="text-[16px] t-primary">T003帮客体验店</Text>
                  <Badge
                    variant="solid"
                    colorScheme="cyan"
                    style={{ paddingTop: 0, paddingBottom: 0 }}
                    _text={{ fontSize: 12, color: "#fff" }}
                  >
                    授权门店
                  </Badge>
                </View>
                <View className="flex flex-col gap-[3px]">
                  <Text className="text-base t-second">
                    广东省深圳市光明区永和街道圆明新园2栋2单元409
                  </Text>
                  <Text className="text-base t-second">
                    移动支付费率: 0.38%
                  </Text>
                  <Text className="text-base t-second">云值守服务费率: 0%</Text>
                  <Text className="text-base t-second">
                    云值守服务率每日封顶金额: 60(元)
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </PullToRefresh>
      </View>
    </Layout>
  );
}
