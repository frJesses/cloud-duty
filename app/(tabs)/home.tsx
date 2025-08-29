import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/business/home/HomeHeader";
import HomeBanner from "@/components/business/home/HomeBanner";
import PullToRefresh from "@/components/common/PullToRefresh";
import { ScrollView } from "native-base";
import { CountUp } from "use-count-up";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={{ flex: 1, width: "100%" }}
      resizeMode="stretch"
    >
      <SafeAreaView
        style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15 }}
      >
        <HomeHeader />
        <PullToRefresh
          onRefresh={() => new Promise((res) => setTimeout(res, 2000))}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex flex-row gap-3">
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
            </View>
            <View className="flex flex-row mt-4 gap-3">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex items-center justify-center bg-white rounded-lg flex-1 h-[80px] relative"
              >
                <Text>进出记录</Text>
                <Image
                  source={require("@/assets/images/home/access-record.png")}
                  className="w-[60px] h-[60px] absolute bottom-0 right-0"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex items-center justify-center bg-white rounded-lg flex-1 h-[80px] relative"
              >
                <Text>数据统计</Text>
                <Image
                  source={require("@/assets/images/home/statistics.png")}
                  className="w-[60px] h-[60px] absolute bottom-0 right-0"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex items-center justify-center bg-white rounded-lg flex-1 h-[80px] relative"
              >
                <Text>订单管理</Text>
                <Image
                  source={require("@/assets/images/home/order.png")}
                  className="w-[60px] h-[60px] absolute bottom-0 right-0"
                />
              </TouchableOpacity>
            </View>
            <HomeBanner />
          </ScrollView>
        </PullToRefresh>
      </SafeAreaView>
    </ImageBackground>
  );
}
