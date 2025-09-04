import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Touch from "./Touch";
import { useRouter } from "expo-router";
import React from "react";

interface Props {
  backCallBack?: () => void;
  title: string;
  right?: React.ReactNode;
  showLeft?: Boolean;
}

export default function CustomHeader({
  backCallBack,
  title,
  right,
  showLeft = true,
}: Props) {
  const router = useRouter();

  function handleBackClick() {
    if (backCallBack) {
      backCallBack();
      return;
    }
    router.back();
  }

  return (
    <View className="h-12 px-4 relative flex flex-row items-center">
      <View className="z-10 pr-4">
        {showLeft && (
          <Touch onPress={handleBackClick}>
            <MaterialIcons name="keyboard-backspace" size={28} color="#333" />
          </Touch>
        )}
      </View>

      <View className="absolute inset-0 items-center justify-center fle flex-row">
        <Text className="text-xl font-medium max-w-[60%]" numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View className="ml-auto z-10 pl-4">{right ?? null}</View>
    </View>
  );
}
