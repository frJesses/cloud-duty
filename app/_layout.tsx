import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import "./global.css";
import * as NavigationBar from "expo-navigation-bar";

// 保持启动屏可见
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loadFont] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loadFont) {
      SplashScreen.hideAsync();
    }
    // 使底部系统导航栏透明，并根据主题调整按钮颜色
    NavigationBar.setBackgroundColorAsync("transparent");
    NavigationBar.setButtonStyleAsync(
      colorScheme === "dark" ? "light" : "dark"
    );
  }, [loadFont]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{ headerShown: false }}
            initialRouteName="splashScreen/index"
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
          <StatusBar translucent backgroundColor="transparent" />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}
