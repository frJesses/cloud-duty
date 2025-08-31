import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomBadge from "@/components/common/CustomBadge";
import Touch from "@/components/common/Touch";

export default function HomeToDoList() {
  return (
    <View className="bg-white mt-4 rounded-lg p-4 flex flex-col gap-4">
      <View className="flex flex-row items-center gap-2">
        <CustomBadge borderColor="#FF6B6B" variant="outline">
          待办
        </CustomBadge>
        <Text className="flex-1 t-primary text-base" numberOfLines={1}>
          完善门店信息完善门店信息完善门店信息完善门店信息完善门店信息
        </Text>
        <Touch>
          <View className="flex flex-row items-center">
            <Text className="text-base text-[#FF6B6B]">去完善</Text>
            <Ionicons name="chevron-forward" size={18} color="#FF6B6B" />
          </View>
        </Touch>
      </View>
      <View className="flex flex-row items-center gap-2">
        <CustomBadge borderColor="#FF6B6B" variant="outline">
          待办
        </CustomBadge>
        <Text className="flex-1 t-primary text-base" numberOfLines={1}>
          您有1件商品未完成建档,请及时处理
        </Text>
        <Touch>
          <View className="flex flex-row items-center">
            <Text className="text-base text-[#FF6B6B]">去处理</Text>
            <Ionicons name="chevron-forward" size={18} color="#FF6B6B" />
          </View>
        </Touch>
      </View>
    </View>
  );
}
