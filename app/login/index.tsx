import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Animated,
  ScrollView,
} from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import CustomTextInput from "@/components/common/TextInputArea";
import { Ionicons } from "@expo/vector-icons";
import { Button, Checkbox, Link } from "native-base";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

interface TabsProps {
  activeIndex: number;
  onChange: (index: number) => void;
}

const PressableTextWrapper = memo(({ activeIndex, onChange }: TabsProps) => {
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
    onChange(nextIndex);
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

function useShakeAniamted() {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 8,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -8,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return { shakeAnim, triggerShake };
}

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [isAgree, setIsAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { triggerShake, shakeAnim } = useShakeAniamted();

  const onLoginPress = async () => {
    router.replace("/(tabs)/home");
    // if (!isAgree) {
    //   setErrorMessage("请先阅读并勾选隐私政策");
    //   triggerShake();
    //   Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    //   return;
    // }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={{ flex: 1, width: "100%" }}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 flex w-full relative">
            <View className="px-10 mt-36 mb-20">
              <Text className="text-3xl font-bold">您好!</Text>
              <Text className="text-lg mt-3">欢迎登陆云值守系统</Text>
            </View>
            <View className="px-10">
              <PressableTextWrapper
                activeIndex={tabIndex}
                onChange={setTabIndex}
              />
              <View className="mt-6 space-y-4 flex flex-col gap-5">
                {tabIndex === 0 ? (
                  <>
                    <CustomTextInput
                      placeholder="请输入用户名"
                      value={username}
                      onChangeText={setUsername}
                      leftIcon={
                        <Ionicons name="person" size={20} color="#999" />
                      }
                    />
                    <CustomTextInput
                      placeholder="请输入密码"
                      value={password}
                      onChangeText={setPassword}
                      isPassword={true}
                      leftIcon={
                        <Ionicons name="lock-closed" size={20} color="#999" />
                      }
                    />
                  </>
                ) : (
                  <>
                    <CustomTextInput
                      placeholder="请输入手机号"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      leftIcon={<Ionicons name="call" size={20} color="#999" />}
                      maxLength={11}
                    />
                    <CustomTextInput
                      placeholder="请输入验证码"
                      value={code}
                      onChangeText={setCode}
                      keyboardType="number-pad"
                      maxLength={6}
                      isVerify
                      leftIcon={<Ionicons name="key" size={20} color="#999" />}
                    />
                  </>
                )}
                <View className="flex flex-row flex-wrap">
                  <Text className="text-red-600 text-sm">这是错误信息</Text>
                </View>
                <Animated.View
                  style={{ transform: [{ translateX: shakeAnim }] }}
                >
                  <Checkbox
                    size="sm"
                    value="agree"
                    isChecked={isAgree}
                    onChange={setIsAgree}
                    _icon={{ size: 2 }}
                    _text={{ fontSize: 10, ml: 0, color: "#9A9A9A" }}
                    borderWidth={1}
                    accessibilityLabel="同意服务条款与隐私政策"
                  >
                    我已阅读并同意
                    <Link
                      _text={{
                        fontSize: 10,
                        _light: {
                          color: Colors.light.sencond,
                        },
                      }}
                      isUnderlined={false}
                    >
                      《云值守商家服务条款》
                    </Link>
                    和
                    <Link
                      _text={{
                        fontSize: 10,
                        _light: {
                          color: Colors.light.sencond,
                        },
                      }}
                      isUnderlined={false}
                    >
                      《隐私政策》
                    </Link>
                  </Checkbox>
                </Animated.View>
                <Button
                  onPress={onLoginPress}
                  accessibilityLabel="立即登陆按钮"
                  _text={{
                    color: "#333",
                  }}
                >
                  立即登录
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
