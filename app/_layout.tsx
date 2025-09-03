import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, extendTheme } from "native-base";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import "./global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// 保持启动屏可见
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loadFont] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const theme = extendTheme({
    colors: {
      primary: {
        50: "#FFFAE0",
        100: "#FFF4BF",
        200: "#FFEE99",
        300: "#FFE873",
        400: "#FFE24C",
        500: "#FFDD26",
        600: "#FFE100",
        700: "#CCB400",
        800: "#998800",
        900: "#665C00",
      },
    },
  });

  useEffect(() => {
    if (loadFont) {
      SplashScreen.hideAsync();
    }
  }, [loadFont]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "fade",
              }}
              initialRouteName="splashScreen/index"
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="test-list" />
            </Stack>
          </GestureHandlerRootView>
          <StatusBar translucent backgroundColor="transparent" />
        </SafeAreaProvider>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}
