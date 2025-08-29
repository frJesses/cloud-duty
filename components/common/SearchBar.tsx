import React from "react";
import {
  View,
  Text,
  TextInput,
  type TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Touch from "./Touch";

interface Props extends TextInputProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  round?: boolean;
}

export default function SearchBar(props: Props) {
  const {
    placeholder = "请输入内容",
    placeholderTextColor = "#999",
    placeholderClassName = "",
    wrapperStyle = {},
    ...attr
  } = props;

  function handleScanClick() {
    console.log("Scan----->>>>");
  }

  return (
    <View className="px-4 flex overflow-hidden h-[38px]" style={wrapperStyle}>
      <View className="flex items-center flex-row gap-2 bg-white/60 px-1 py-1 rounded-full">
        <View className="opacity-50">
          <Ionicons name="search-outline" size={24} color="black" />
        </View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          placeholderClassName={placeholderClassName}
          multiline={false}
          numberOfLines={1}
          style={{
            flex: 1,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          cursorColor="rgba(0, 0, 0, 0.2)"
          className="text-base overflow-hidden"
          {...attr}
        />
        <Touch className="opacity-40" onPress={handleScanClick}>
          <MaterialCommunityIcons name="line-scan" size={24} color="black" />
        </Touch>
        <View className="h-[70%] w-[1px] bg-[#9A9A9A] opacity-20" />
        <Touch className="bg-theme rounded-full" activeOpacity={0.7}>
          <Text className="text-[14px] px-3 py-1" allowFontScaling={false}>
            搜索
          </Text>
        </Touch>
      </View>
    </View>
  );
}
