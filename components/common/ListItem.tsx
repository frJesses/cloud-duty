import { View, Text, ViewProps, StyleProp } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import Touch from "./Touch";

interface Props {
  isLink?: Boolean;
  wrapperStyle?: StyleProp<ViewProps>;
  icon?: React.ReactNode;
  title: string;
  descTitle?: string;
  onPress?: () => void;
}

export default function ListItem({
  isLink = true,
  wrapperStyle,
  icon,
  title,
  descTitle,
  onPress,
}: Props) {
  function handlePressClick() {
    if (!isLink) {
      return;
    }
    onPress && onPress();
  }

  return (
    <Touch
      className="h-14 flex flex-row items-center px-4 bg-white border-b-[1px] border-[#F5F5F5]"
      style={wrapperStyle}
      onPress={handlePressClick}
    >
      <View className="flex-1 flex flex-row items-center gap-3">
        {icon}
        <Text className="flex-1">{title}</Text>
        <Text className="max-w-[50%] text-gray-400" numberOfLines={1}>
          {descTitle}
        </Text>
      </View>
      {isLink && (
        <View className="w-7 flex flex-row items-center justify-center">
          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color="#9A9A9A"
          />
        </View>
      )}
    </Touch>
  );
}
