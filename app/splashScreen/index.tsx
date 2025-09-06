import { Text, View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { signup } from "@/api/user";
import { useLogin } from "@/hooks/useLogin";

export default function SplashScreen() {
  const router = useRouter();
  const { handleLogin } = useLogin();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const startAnimations = async () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        checkAuthAndNavigate();
      }, 1500);
    };
    startAnimations();
  }, []);

  const checkAuthAndNavigate = async () => {
    try {
      const res = await signup();
      if (!res) {
        router.replace("/login");
        return;
      }
      await handleLogin();
    } catch (err) {
      router.replace("/login");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <View className="flex-1 justify-center items-center bg-white">
        {/* Logo 动画 */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            alignItems: "center",
          }}
        >
          <Ionicons name="storefront" size={80} color="#4A90E2" />
          <Text className="text-[28px] font-bold t-primary mt-5 text-center">
            云值守小店
          </Text>
          <Text className="text-[16px] text-[#666] mt-3 text-center leading-5">
            智能零售管理平台
          </Text>
          <Text className="text-[14px] text-[#6B7280] mt-2 text-center leading-5 px-10">
            24小时无人值守，智能监控管理
          </Text>
          <Text className="text-[14px] text-[#6B7280] mt-1 text-center leading-5 px-10">
            让零售更简单，让管理更高效
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
