import { Text, View, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // 启动动画序列
    const startAnimations = async () => {
      // 1. Logo 淡入和缩放动画
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

      // 2. 等待动画完成后开始检查逻辑
      setTimeout(() => {
        checkAuthAndNavigate();
      }, 1500);
    };

    startAnimations();
  }, []);

  const checkAuthAndNavigate = async () => {
    try {
      // 这里添加你的认证逻辑
      // 例如：检查 token、用户状态等

      // 模拟检查过程
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 示例：检查是否有有效的 token
      const hasValidToken = await checkTokenValidity();

      // 使用 push 而不是 replace，让跳转更平滑
      if (hasValidToken) {
        // 有有效 token，跳转到主页面
        router.push("/(tabs)");
      } else {
        // 没有有效 token，跳转到登录页面
        router.push("/login");
      }
    } catch (error) {
      console.error("启动检查失败:", error);
      // 出错时默认跳转到登录页面
      router.push("/login");
    }
  };

  // 模拟检查 token 有效性的函数
  const checkTokenValidity = async (): Promise<boolean> => {
    // 这里实现你的 token 检查逻辑
    // 例如：从 AsyncStorage 读取 token 并验证
    return false; // 暂时返回 false，跳转到登录页面
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1a1a1a",
        }}
      >
        {/* Logo 动画 */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            alignItems: "center",
          }}
        >
          <Ionicons name="storefront" size={80} color="#4A90E2" />
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            云值守小店
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#888888",
              marginTop: 12,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            智能零售管理平台
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666666",
              marginTop: 8,
              textAlign: "center",
              lineHeight: 20,
              paddingHorizontal: 40,
            }}
          >
            24小时无人值守，智能监控管理
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666666",
              marginTop: 4,
              textAlign: "center",
              lineHeight: 20,
              paddingHorizontal: 40,
            }}
          >
            让零售更简单，让管理更高效
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
