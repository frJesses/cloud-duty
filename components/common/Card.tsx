import { Text, View } from "react-native";
import Touch from "./Touch";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  moreText?: string;
  pressCallback?: () => void;
  children?: React.ReactNode;
}

export default function Card(props: Props) {
  const {
    title = "这是默认标题",
    moreText = "查看更多",
    pressCallback,
    children,
  } = props;

  function handlePress() {
    pressCallback && pressCallback();
  }

  return (
    <Touch onPress={handlePress} className="bg-white rounded-lg">
      <View className="px-4 py-2 border-b-[1px] border-[#f5f5f5]">
        <Text className="text-[16px] t-primary">{title}</Text>
      </View>
      <View className="px-4 py-3">{children}</View>
      <View className="flex flex-row justify-end items-center border-t-[1px] border-[#f5f5f5] px-4 py-2">
        <Text className="t-second text-sm">{moreText}</Text>
        <Ionicons name="chevron-forward" size={16} color="#9E9E9E" />
      </View>
    </Touch>
  );
}
