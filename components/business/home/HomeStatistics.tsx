import Touch from "@/components/common/Touch";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { CountUp } from "use-count-up";
import { getStatisticeData } from "@/api/statistics";
import MathUtils from "@/utils/mathUtils";

interface StatisticsProps {
  pressCallback: () => void;
  countInfo: {
    integer: number;
    second: number;
    third: number;
    count: number;
  };
  title: string;
  subTitle: string;
}

type Value = number | string | undefined;

function StatisticsItem(props: StatisticsProps) {
  const { pressCallback, countInfo, title, subTitle } = props;

  function handleDataClick() {
    pressCallback();
  }

  return (
    <Touch className="flex-1" onPress={handleDataClick}>
      <View className="flex-1 py-3 px-6 bg-white rounded-lg gap-3">
        <Text className="text-16 t-primary">{title}</Text>
        <View className="flex flex-row items-end">
          <Text className="color-second font-bold text-2xl">
            <CountUp
              isCounting
              start={0}
              end={countInfo.integer}
              duration={1}
            />
          </Text>
          <Text className="color-second font-bold text-xl">.</Text>
          <Text className="color-second font-bold text-xl">
            <CountUp isCounting end={countInfo.second} duration={1} />
          </Text>
          <Text className="color-second font-bold text-xl">
            <CountUp isCounting end={countInfo.third} duration={1} />
          </Text>
        </View>
        <View className="flex flex-row gap-2">
          <View className="w-[5px] bg-[#FFE100] h-full rounded-sm" />
          <Text className="text-[14px] t-second">{subTitle}</Text>
        </View>
        <Text className="t-primary text-[16px]">
          <CountUp isCounting end={countInfo?.count || 0} duration={1} />
        </Text>
      </View>
    </Touch>
  );
}

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
    return transformValue(statistics?.paidTotal, statistics?.paidCount);
  }, [statistics]);

  const noHunman = useMemo(() => {
    return transformValue(statistics?.nonhumanTotal, statistics?.nonhumanCount);
  }, [statistics]);

  function transformValue(value: Value, total: Value) {
    const num = MathUtils.trans(value);
    const [integer = 0, decimal = "00"] = num.split(".");
    const [second, third] = String(decimal);
    return {
      integer: Number(integer),
      second: Number(second),
      third: Number(third),
      count: Number(total) || 0,
    };
  }

  return (
    <View className="flex flex-row gap-3">
      <StatisticsItem
        title="今日总营业额"
        subTitle="总订单数"
        countInfo={total}
        pressCallback={handleDataClick}
      />
      <StatisticsItem
        title="云值守营业额"
        subTitle="云值守订单数"
        countInfo={noHunman}
        pressCallback={handleDataClick}
      />
    </View>
  );
}
