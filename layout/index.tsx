import React from "react";
import { Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/common/CustomHeader";

interface Props {
  children: React.ReactElement;
}

export default function Layout({ children }: Props) {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={{ flex: 1, width: "100%" }}
      resizeMode="stretch"
    >
      <SafeAreaView>
        <CustomHeader title="选择店铺选择店铺选择店铺选择店铺选择店铺选择店铺选择店铺" />
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}
