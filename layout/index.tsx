import React from "react";
import { View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/common/CustomHeader";

interface Props {
  children: React.ReactElement;
  title?: string;
  headerRight?: React.ReactNode;
  showArrow?: Boolean;
}

export default function Layout({
  children,
  title,
  headerRight,
  showArrow,
}: Props) {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={{ flex: 1, width: "100%" }}
      resizeMode="stretch"
    >
      <SafeAreaView
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {title && (
          <CustomHeader
            title={title}
            right={headerRight}
            showLeft={showArrow}
          />
        )}
        <View className="flex-1 flex-col flex">{children}</View>
      </SafeAreaView>
    </ImageBackground>
  );
}
