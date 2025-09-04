import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { TABS_LIST } from "@/constants/Tabs";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  function CustomTabButton(props: any) {
    return <TouchableOpacity {...props} activeOpacity={1} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF6F00",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }),
        tabBarItemStyle: {
          backgroundColor: "transparent",
        },
        tabBarButton: (props) => <CustomTabButton {...props} />,
      }}
    >
      {TABS_LIST.map((t) => (
        <Tabs.Screen
          key={t.path}
          name={t.path}
          options={{
            title: t.name,
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={(focused ? t.activeIcon : t.icon) as any}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
