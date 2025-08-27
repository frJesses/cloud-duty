import { View, Image, TouchableOpacity, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeHeader() {
  const handleSearchClick = () => {
    console.log("搜索图标被点击了---->>>>");
  };

  const handleStoreClick = () => {
    console.log("门店名称被点击了----->>>>>");
  };

  return (
    <>
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity
          onPress={handleStoreClick}
          className="flex flex-row items-center gap-2 max-w-[60%]"
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons
            name="storefront-outline"
            size={20}
            color="#1A1A1A"
          />
          <View className="flex flex-row items-center">
            <Text className="text-xl font-bold" numberOfLines={1}>
              支付宝专用测试门店支付宝专用测试门店支付宝专用测试门店
            </Text>
            <MaterialCommunityIcons
              name="menu-down"
              size={28}
              color="#1A1A1A"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearchClick} activeOpacity={0.6}>
          <Ionicons name="search-outline" size={22} color="#1A1A1A" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center gap-4 ml-8 mt-2">
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
