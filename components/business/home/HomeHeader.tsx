import { View, Image, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Touch from "@/components/common/Touch";
import { useCommonStore } from "@/store";

export default function HomeHeader() {
  const { currentStore } = useCommonStore();

  const handleSearchClick = () => {};

  const handleStoreClick = () => {
    router.push("/store/SelectStore");
  };

  return (
    <>
      <View className="flex flex-row items-center justify-between">
        <Touch
          onPress={handleStoreClick}
          className="flex flex-row items-center gap-2 max-w-[60%]"
        >
          <MaterialCommunityIcons
            name="storefront-outline"
            size={20}
            color="#1A1A1A"
          />
          <View className="flex flex-row items-center">
            <Text className="text-xl font-bold" numberOfLines={1}>
              {currentStore?.name}
            </Text>
            <MaterialCommunityIcons
              name="menu-right"
              size={28}
              color="#1A1A1A"
            />
          </View>
        </Touch>
        <Touch onPress={handleSearchClick} activeOpacity={0.6}>
          <Ionicons name="search-outline" size={22} color="#1A1A1A" />
        </Touch>
      </View>
      <View className="flex flex-row items-center gap-4 ml-8 mt-2 mb-4">
        <View className="flex flex-row items-center gap-2">
          <Image
            source={require("@/assets/images/home/customer.png")}
            className="w-5 h-5"
          />
          <Text className="t-second text-[14px]">远程值守</Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <Image
            source={require("@/assets/images/home/compensation.png")}
            className="w-5 h-5"
          />
          <Text className="t-second text-[14px]">丢货赔付</Text>
        </View>
      </View>
    </>
  );
}
