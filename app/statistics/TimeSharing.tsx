import Layout from "@/layout";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Touch from "@/components/common/Touch";

export default function () {
  return (
    <Layout
      title="分时统计"
      headerRight={
        <Touch>
          <Ionicons name="calendar" size={24} color="#333" />
        </Touch>
      }
    >
      <View className="h-full">
        <View className="flex flex-row justify-center gap-2 py-2">
          <Text className="text-base t-second">2024年8月29号</Text>
          <Text className="text-base t-second">至</Text>
          <Text className="text-base t-second">2024年8月29号</Text>
        </View>
        <ScrollView className="bg-white">
          {new Array(24).fill(0).map((item, index) => (
            <View key={index} className="flex flex-row px-4 gap-3 items-center">
              <Text className="text-base color-second w-20 text-center">
                {String(index + 1).padStart(2, "0")}时
              </Text>
              <View className="flex flex-row flex-wrap flex-1 border-b-[1px] border-[#f5f5f5] py-2">
                <Text className="text-base t-primary w-[50%]">
                  销售额: 18.84元
                </Text>
                <Text className="text-base t-primary w-[50%]">
                  利润: 18.84元
                </Text>
                <Text className="text-base t-primary w-[50%]">订单数: 18</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}
