import Touch from "@/components/common/Touch";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { CountUp } from "use-count-up";
import { getStatisticeData } from "@/api/statistics";
import MathUtils from "@/utils/mathUtils";

export default function HomeStatistice() {
  const router = useRouter();
  const [statistics, setStatistice] =
    useState<Api.Response.HomeStatistics | null>(null);

  useEffect(() => {
    initData();
  }, []);

  async function initData() {
    const res = await getStatisticeData();
    setStatistice(res);
  }

  function handleDataClick() {
    router.push("/statistics/DataStistics");
  }

  const total = useMemo(() => {
    return transformValue(statistics?.paidTotal);
  }, [statistics]);

  const noHunman = useMemo(() => {
    return transformValue(statistics?.nonhumanTotal);
  }, [statistics]);

  function transformValue(value: string | number | undefined) {
    const num = MathUtils.trans(value);
    const [integer = 0, decimal = "00"] = num.split(".");
    const [second, third] = String(decimal);
    return {
      integer: Number(integer),
      second: Number(second),
      third: Number(third),
    };
  }

  return (
    <View className="flex flex-row gap-3">
      <Touch className="flex-1" onPress={handleDataClick}>
        <View className="flex-1 py-3 px-6 bg-white rounded-lg gap-3">
          <Text className="text-16 t-primary">今日总营业额</Text>
          <View className="flex flex-row items-end">
            <Text className="color-second font-bold text-2xl">
              <CountUp isCounting start={0} end={total.integer} duration={1} />
            </Text>
            <Text className="color-second font-bold text-xl">.</Text>
            <Text className="color-second font-bold text-xl">
              <CountUp isCounting end={total.second} duration={1} />
            </Text>
            <Text className="color-second font-bold text-xl">
              <CountUp isCounting end={total.third} duration={1} />
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <View className="w-[5px] bg-[#FFE100] h-full rounded-sm" />
            <Text className="text-[14px] t-second">总订单数</Text>
          </View>
          <Text className="t-primary text-[16px]">
            {statistics?.paidCount || 0}
          </Text>
        </View>
      </Touch>
      <Touch className="flex-1" onPress={handleDataClick}>
        <View className="flex-1 py-3 px-6 bg-white rounded-lg gap-3">
          <Text className="t-primary">云值守营业额</Text>
          <View className="flex flex-row items-end">
            <Text className="color-second font-bold text-2xl">
              <CountUp isCounting end={noHunman.integer} duration={1} />
            </Text>
            <Text className="color-second font-bold text-xl">.</Text>
            <Text className="color-second font-bold text-xl">
              <CountUp isCounting end={noHunman.second} duration={1} />
            </Text>
            <Text className="color-second font-bold text-xl">
              <CountUp isCounting end={noHunman.third} duration={1} />
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <View className="w-[5px] bg-[#FFE100] h-full rounded-sm" />
            <Text className="text-[14px] t-second">云值守订单数</Text>
          </View>
          <Text className="t-primary text-[16px]">
            {statistics?.paidCount || 0}
          </Text>
        </View>
      </Touch>
    </View>
  );
}
