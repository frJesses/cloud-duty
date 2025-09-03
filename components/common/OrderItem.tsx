import { View, Text, Image } from "react-native";

export function GoodsItem() {
  return (
    <View className="bg-gray-50 px-4 py-2 flex flex-row gap-4">
      <Image
        source={require("@/assets/images/order/order.jpg")}
        className="w-20 h-20"
      />
      <View className="flex-1 flex flex-col">
        <View className="flex flex-row justify-between">
          <Text className="text-base t-primary">东鹏特饮瓶装功能饮料#</Text>
          <Text className="text-base t-primary">￥6.00</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-base t-primary">69545123456748</Text>
          <Text className="text-base t-primary line-through">￥6.00</Text>
        </View>
        <View className="flex flex-row justify-end">
          <Text className="text-base t-primary">x1</Text>
        </View>
        <View className="flex flex-row gap-1">
          <Text className="text-xs t-second">进货价:0</Text>
          <Text className="text-xs t-second">毛利率:100%</Text>
        </View>
      </View>
    </View>
  );
}

export default function OrderItem() {
  return (
    <View className="flex flex-col gap-2 py-3 bg-white">
      <View className="flex flex-row justify-between px-4">
        <Text className="t-primary text-base">15797698520</Text>
        <Text className="t-primary text-base">2024年12月17号 10:26:30</Text>
      </View>
      <View className="flex flex-row justify-between px-4">
        <Text className="t-primary text-base">99911华安</Text>
        <Text className="t-primary text-base">交易成功</Text>
      </View>
      {GoodsItem()}
      <View className="flex flex-row justify-between px-4">
        <View className="flex flex-row gap-1">
          <Image
            source={require("@/assets/images/order/alipay.png")}
            className="w-5 h-5"
          />
          <Image
            source={require("@/assets/images/order/balance.png")}
            className="w-5 h-5"
          />
          <Image
            source={require("@/assets/images/order/noperson.png")}
            className="w-5 h-5"
          />
        </View>
        <Text className="text-xs t-second">共计1件商品,优惠: ￥0.00,合计金额: ￥6.00</Text>
      </View>
    </View>
  );
}
