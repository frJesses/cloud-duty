import { Text, View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function SplashScreen() {
  const router = useRouter();
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
    router.replace("/home");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
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
              color: "#111111",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            云值守小店
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#666666",
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
              color: "#6B7280",
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
              color: "#6B7280",
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
