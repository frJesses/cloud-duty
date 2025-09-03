import Layout from "@/layout";
import { View, Text, ScrollView } from "react-native";
import CustomTabView from "@/components/common/CustomTabView";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import OrderItem from "@/components/common/OrderItem";

function SaleOrder() {
  return (
    <View>
      <ScrollView>
        <View className="mb-2">
          <OrderItem />
        </View>
        <View className="mb-2">
          <OrderItem />
        </View>
        <View className="mb-2">
          <OrderItem />
        </View>
        <View className="mb-2">
          <OrderItem />
        </View>
        <View className="mb-2">
          <OrderItem />
        </View>
      </ScrollView>
    </View>
  );
}

function SaleRank() {
  return (
    <View className="bg-white flex flex-col gap-3">
      <ScrollView>
        {new Array(10).fill(true).map((item, index) => (
          <View
            key={index}
            className="flex flex-row border-b-[1px] border-[#f5f5f5] px-4 py-3 items-center"
          >
            <View className="flex flex-col gap-2 flex-1">
              <Text>东鹏特饮瓶装功能饮料#</Text>
              <Text>69545123456748</Text>
              <Text>销量: 4</Text>
            </View>
            <Barcode
              value="69487512336211"
              text="69487512336211"
              width={1.3}
              height={50}
              format="CODE128"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default function DutyRecordDetail() {
  return (
    <Layout title="值守详情">
      <View className="h-full">
        <View className="bg-white flex flex-col px-4 py-3 gap-2 border-b-[1px] border-[#f5f5f5]">
          <Text>切换云值守: 2025-01-09 17:47:47</Text>
          <Text>切换有人: 2025-01-09 17:47:47</Text>
          <Text>时长: 198天</Text>
          <Text>订单数: 147</Text>
          <Text>销售额: ￥0.00</Text>
        </View>
        <CustomTabView
          tabMap={[
            { key: "first", title: "销售订单" },
            { key: "sencond", title: "销售排行" },
          ]}
          sceneMap={{
            first: SaleOrder,
            sencond: SaleRank,
          }}
          tabBarBg="#FFFFFF"
        />
      </View>
    </Layout>
  );
}
