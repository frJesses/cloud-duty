import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import HomeHeader from "@/components/business/home/HomeHeader";
import HomeBanner from "@/components/business/home/HomeBanner";
import { useState } from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

export default function HomeScreen() {
  const router = useRouter();
  const handleClickItem = () => {
    router.push("/login");
  };

  const [refreshing, setRefreshing] = useState(false);
  const translateY = useSharedValue(0);
  const threshold = 60; // 下拉多少触发刷新
  const MAX_PULL = 80; // 最大下拉位移

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      translateY.value = withSpring(0);
    }, 2000);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // 头部条的高度与透明度跟随下拉距离变化，但不参与布局（绝对定位）
  const headerStyle = useAnimatedStyle(() => {
    const h = interpolate(
      translateY.value,
      [0, threshold, MAX_PULL],
      [0, 24, 40],
      Extrapolation.CLAMP
    );
    const op = interpolate(
      translateY.value,
      [0, 10],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { height: h, opacity: op };
  });

  // 手势在 UI 线程处理，避免频繁跨线程导致卡顿
  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event: any) => {
      if (!refreshing) {
        const dy = Math.max(0, event.translationY);
        translateY.value = Math.min(MAX_PULL, dy);
      }
    },
    onEnd: () => {
      if (translateY.value > threshold) {
        runOnJS(handleRefresh)();
      } else {
        translateY.value = withSpring(0);
      }
    },
  });

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
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.container, animatedStyle]}>
            <Animated.View style={[headerStyle]}>
              {refreshing ? (
                <View className="flex items-center flex-row justify-center">
                  <ActivityIndicator size="small" color="#333" />
                  <Text style={{ marginLeft: 8 }}>正在刷新...</Text>
                </View>
              ) : null}
            </Animated.View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              nestedScrollEnabled={true}
              style={{ flex: 1 }}
            >
              <View className="flex flex-row gap-3 mt-4">
                <View className="flex-1 py-3 px-6 bg-white rounded-lg gap-3">
                  <Text className="text-16 t-primary">今日总营业额</Text>
                  <View className="flex flex-row items-end">
                    <Text className="color-second font-bold text-2xl">
                      1902
                    </Text>
                    <Text className="color-second font-bold text-xl">.39</Text>
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
                      1902
                    </Text>
                    <Text className="color-second font-bold text-xl">.39</Text>
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
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "#f8f8f8",
  },
  item: {
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
});
