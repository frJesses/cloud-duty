import React from "react";
import Layout from "@/layout";
import { Image, ScrollView, Text, View } from "react-native";
import Touch from "@/components/common/Touch";
import { Ionicons } from "@expo/vector-icons";

export default function ClosingStatistics() {
  return (
    <Layout
      title="结班记录"
      headerRight={
        <Touch>
          <Ionicons name="calendar" size={24} color="#333" />
        </Touch>
      }
    >
      <View className="h-full">
        <View className="flex flex-row justify-center items-center gap-2">
          <Text className="text-base t-second">2025年8月2日</Text>
          <Text className="text-base t-second">至</Text>
          <Text className="text-base t-second">2025年8月2日</Text>
        </View>
        <Touch className="bg-white py-2 px-4 flex flex-row gap-1 mt-3">
          <Text className="text-base t-primary">请选择门店:</Text>
          <Text className="text-base t-second">全部门店</Text>
        </Touch>
        <ScrollView>
          <View className="bg-white border-t-[1px] border-[#f5f5f5] px-4 py-2 flex flex-col gap-2">
            <View className="flex flex-col gap-2 border-b-[1px] border-[#f5f5f5] pb-3">
              <Text className="t-primary text-base">营业员: 13430401702</Text>
              <View className="flex flex-row">
                <Text className="t-primary text-base flex-1">
                  工作时长: 777小时
                </Text>
                <Text className="t-primary text-base flex-1">
                  收款总额: 0.00元
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="t-primary text-base flex-1">
                  现金收款: 330.00元
                </Text>
                <Text className="t-primary text-base flex-1">
                  移动收款: 0.00元
                </Text>
              </View>
            </View>
            <View className="flex flex-col gap-2 border-b-[1px] border-[#f5f5f5] pb-3">
              <Text className="t-primary text-base">营业员: 远程值守</Text>
              <View className="flex flex-row">
                <Text className="t-primary text-base flex-1">
                  工作时长: 777小时
                </Text>
                <Text className="t-primary text-base flex-1">
                  收款总额: 0.00元
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="t-primary text-base flex-1">
                  现金收款: 330.00元
                </Text>
                <Text className="t-primary text-base flex-1">
                  移动收款: 0.00元
                </Text>
              </View>
            </View>
          </View>
          <View className="bg-white px-4 last:border-b-0">
            {new Array(30).fill(true).map((item, index) => (
              <View
                className="flex flex-col gap-2 py-3 border-b-[1px] border-[#f5f5f5]"
                key={index}
              >
                <Text className="text-base t-primary">0598桃花源测试店</Text>
                <View className="flex flex-row justify-between">
                  <Text className="text-base t-primary">13430401702</Text>
                  <Text className="text-base t-primary">已结班</Text>
                </View>
                <Text className="text-base t-primary">
                  开始时间:2025-08-29 18:11:47
                </Text>
                <Text className="text-base t-primary">
                  结束时间:2025-08-29 18:11:47
                </Text>
                <View className="flex flex-row mt-4">
                  <View className="flex-1 flex flex-col justify-center items-center gap-2">
                    <Image
                      source={require("@/assets/images/statistics/balance.png")}
                      className="w-14 h-14"
                    />
                    <Text>¥0.00元</Text>
                  </View>
                  <View className="flex-1 flex flex-col justify-center items-center gap-2">
                    <Image
                      source={require("@/assets/images/statistics/wxpay.png")}
                      className="w-14 h-14"
                    />
                    <Text>¥0.00元</Text>
                  </View>
                  <View className="flex-1 flex flex-col justify-center items-center gap-2">
                    <Image
                      source={require("@/assets/images/statistics/alipay.png")}
                      className="w-14 h-14"
                    />
                    <Text>¥0.00元</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
