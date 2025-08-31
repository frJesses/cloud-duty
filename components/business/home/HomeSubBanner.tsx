import { View, Image, Text } from "react-native";
import Touch from "@/components/common/Touch";

export default function HomeSubBanner() {
  return (
    <View className="flex flex-row mt-4 gap-3">
      <Touch
        activeOpacity={0.7}
        className="flex items-center justify-center bg-white rounded-lg flex-1 h-[80px] relative"
      >
        <Text>进出记录</Text>
        <Image
          source={require("@/assets/images/home/access-record.png")}
          className="w-[60px] h-[60px] absolute bottom-0 right-0"
        />
      </Touch>
      <Touch
        activeOpacity={0.7}
        className="flex items-center justify-center bg-white rounded-lg flex-1 h-[80px] relative"
      >
        <Text>数据统计</Text>
        <Image
          source={require("@/assets/images/home/statistics.png")}
          className="w-[60px] h-[60px] absolute bottom-0 right-0"
        />
      </Touch>
      <Touch
        activeOpacity={0.7}
        className="flex items-center justify-center bg-white rounded-lg flex-1 h-[80px] relative"
      >
        <Text>订单管理</Text>
        <Image
          source={require("@/assets/images/home/order.png")}
          className="w-[60px] h-[60px] absolute bottom-0 right-0"
        />
      </Touch>
    </View>
  );
}
