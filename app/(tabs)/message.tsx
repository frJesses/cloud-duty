import { Image, ScrollView, Text, View } from "react-native";
import Layout from "@/layout";
import Touch from "@/components/common/Touch";

function MessageItem() {
  return (
    <Touch className="py-3 border-b-[1px] border-[#f5f5f5] flex flex-row gap-3">
      <Image
        source={require("@/assets/images/message/screenshot.png")}
        className="w-16 h-16"
      />
      <View className="flex-1 flex-col flex justify-between">
        <Text className="text-base t-primary">截图报告</Text>
        <Text className="text-base t-second" numberOfLines={1}>T0001门店截图报备T0001门店截图报备T0001门店截图报备</Text>
      </View>
      <Text className="text-base t-second">2024-05-06</Text>
    </Touch>
  );
}

export default function Message() {
  return (
    <Layout title="消息中心" showArrow={false}>
      <View className="h-full bg-white px-3">
        <ScrollView>
          <View>
            {MessageItem()}
            {MessageItem()}
            {MessageItem()}
            {MessageItem()}
            {MessageItem()}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
