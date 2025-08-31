import Touch from "@/components/common/Touch";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { CountUp } from "use-count-up";

export default function HomeStatistice() {
  const router = useRouter();

  function handleDataClick() {
    router.push("/statistics/DataStistics");
  }

  return (
    <View className="flex flex-row gap-3">
      <Touch className="flex-1" onPress={handleDataClick}>
        <View className="flex-1 py-3 px-6 bg-white rounded-lg gap-3">
          <Text className="text-16 t-primary">今日总营业额</Text>
          <View className="flex flex-row items-end">
            <Text className="color-second font-bold text-2xl">
              <CountUp isCounting end={1903} duration={3} />
            </Text>
            <Text className="color-second font-bold text-xl">.</Text>
            <Text className="color-second font-bold text-xl">
              <CountUp isCounting end={39} duration={1} />
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <View className="w-[5px] bg-[#FFE100] h-full rounded-sm" />
            <Text className="text-[14px] t-second">总订单数</Text>
          </View>
          <Text className="t-primary text-[16px]">100</Text>
        </View>
      </Touch>
      <Touch className="flex-1" onPress={handleDataClick}>
        <View className="flex-1 py-3 px-6 bg-white rounded-lg gap-3">
          <Text className="t-primary">云值守营业额</Text>
          <View className="flex flex-row items-end">
            <Text className="color-second font-bold text-2xl">
              <CountUp isCounting end={239} duration={1} />
            </Text>
            <Text className="color-second font-bold text-xl">.</Text>
            <Text className="color-second font-bold text-xl">
              <CountUp isCounting end={39} duration={1} />
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <View className="w-[5px] bg-[#FFE100] h-full rounded-sm" />
            <Text className="text-[14px] t-second">云值守订单数</Text>
          </View>
          <Text className="t-primary text-[16px]">300</Text>
        </View>
      </Touch>
    </View>
  );
}
