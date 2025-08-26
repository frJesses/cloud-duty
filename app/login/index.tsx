import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ImageBackground, Pressable, Animated } from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import CustomTextInput from "@/components/common/TextInputArea";
import { Ionicons } from "@expo/vector-icons";

const PressableTextWrapper = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>(
    []
  );
  const underlineLeft = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;

  const handleTabLayout = (index: number, x: number, width: number) => {
    setTabLayouts((prev) => {
      const next = [...prev];
      next[index] = { x, width };
      return next;
    });
  };

  useEffect(() => {
    if (tabLayouts[activeIndex]) {
      const fullWidth = tabLayouts[activeIndex].width;
      const targetWidth = fullWidth * 0.6;
      const targetLeft =
        tabLayouts[activeIndex].x + (fullWidth - targetWidth) / 2;
      underlineLeft.setValue(targetLeft);
      underlineWidth.setValue(targetWidth);
    }
  }, [tabLayouts]);

  const animateToIndex = (nextIndex: number) => {
    if (!tabLayouts[nextIndex]) return;
    setActiveIndex(nextIndex);
    const fullWidth = tabLayouts[nextIndex].width;
    const targetWidth = fullWidth * 0.6;
    const targetLeft = tabLayouts[nextIndex].x + (fullWidth - targetWidth) / 2;
    Animated.parallel([
      Animated.timing(underlineLeft, {
        toValue: targetLeft,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(underlineWidth, {
        toValue: targetWidth,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View className="relative flex-row items-center gap-3">
      <Pressable
        onPress={() => animateToIndex(0)}
        onLayout={(e) =>
          handleTabLayout(0, e.nativeEvent.layout.x, e.nativeEvent.layout.width)
        }
        style={{ paddingVertical: 4 }}
      >
        <Text
          className="text-base"
          style={{ color: activeIndex === 0 ? "#1A1A1A" : "#1A1A1A" }}
        >
          密码登陆
        </Text>
      </Pressable>
      <Pressable
        onPress={() => animateToIndex(1)}
        onLayout={(e) =>
          handleTabLayout(1, e.nativeEvent.layout.x, e.nativeEvent.layout.width)
        }
        style={{ paddingVertical: 4 }}
      >
        <Text
          className="text-base"
          style={{ color: activeIndex === 1 ? "#1A1A1A" : "#1A1A1A" }}
        >
          验证码登陆
        </Text>
      </Pressable>
      <Animated.View
        style={{
          position: "absolute",
          left: underlineLeft,
          bottom: 0,
          width: underlineWidth,
          height: 3,
          backgroundColor: "#EFA100",
          borderRadius: 2,
        }}
      />
    </View>
  );
});

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 flex w-full">
          <View className="px-6 mt-32 mb-16">
            <Text className="text-3xl font-bold">您好!</Text>
            <Text className="text-lg mt-3">欢迎登陆云值守系统</Text>
          </View>
          <View className="px-6">
            <PressableTextWrapper />
            <View className="mt-6 space-y-4 flex flex-col gap-4">
              <CustomTextInput
                placeholder="请输入用户名"
                value={username}
                onChangeText={setUsername}
                keyboardType="default"
                autoCapitalize="none"
                leftIcon={<Ionicons name="person" size={20} color="#999" />}
              />
              <CustomTextInput
                placeholder="请输入密码"
                value={password}
                onChangeText={setPassword}
                isPassword={true}
                keyboardType="default"
                leftIcon={
                  <Ionicons name="lock-closed" size={20} color="#999" />
                }
                rightIcon={<Ionicons name="eye" size={20} color="#999" />}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
