import Layout from "@/layout";
import React, { useRef, useState } from "react";
import { Text, View, ScrollView, Animated } from "react-native";
import Touch from "@/components/common/Touch";
import PullToRefresh from "@/components/common/PullToRefresh";
import CustomActionsheet, {
  ActionSheetRef,
  Action,
} from "@/components/common/ActionSheet";
import { Ionicons } from "@expo/vector-icons";

function CollapseItem({ children }: { children: React.ReactNode }) {
  const [animation] = useState(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(100);

  const toggleCollapse = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const onContentLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  return (
    <Animated.View
      className="flex-1 overflow-hidden"
      style={{
        height: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [32, 58],
        }),
      }}
    >
      <Touch
        onPress={toggleCollapse}
        onLayout={onContentLayout}
        className="flex flex-row flex-1 items-start gap-8 border-b-[1px] border-[#f5f5f5]"
      >
        <View className="flex-1">{children}</View>
        <Animated.View
          style={{
            transform: [
              {
                rotate: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "180deg"],
                }),
              },
            ],
          }}
        >
          <Ionicons name="chevron-down" size={20} color="#666" />
        </Animated.View>
      </Touch>
    </Animated.View>
  );
}

export default function CategoryStatistics() {
  const array = new Array(30).fill(true);
  const [mode, setMode] = useState<Action>({ label: "全部", value: null });

  const actionRef = useRef<ActionSheetRef>(null);

  function handleActionCallback(item: Action) {
    console.log(item, "item----->>>");
    setMode(item);
  }

  return (
    <Layout title="分类统计">
      <View className="h-full">
        <View className="flex flex-row h-[38px] items-center bg-white px-4 border-b-[1px] border-[#f5f5f5]">
          <Touch className="flex flex-row flex-1 gap-3">
            <Text className="text-base t-primary">请选择月份:</Text>
            <Text className="text-base t-second">2025-09</Text>
          </Touch>
          <Touch
            className="flex flex-row flex-1 gap-3"
            onPress={() => actionRef.current?.open()}
          >
            <Text className="text-base t-primary">请选择模式:</Text>
            <Text className="text-base t-second">{mode.label}</Text>
          </Touch>
        </View>
        <PullToRefresh onRefresh={() => {}}>
          <ScrollView className="bg-white">
            <View className="flex flex-col gap-3 py-3">
              <View className="flex flex-row items-start px-4 gap-4">
                <Text className="text-base font-medium color-blue-500">
                  合计
                </Text>
                <CollapseItem>
                  <View className="flex flex-row justify-between mb-2">
                    <Text className="text-base text-gray-600">香烟: 0.00</Text>
                    <Text className="text-base text-gray-600">非烟: 0.00</Text>
                  </View>
                  <View className="flex flex-row justify-between mb-2">
                    <Text className="text-base text-gray-600">其它: 0.00</Text>
                    <Text className="text-base text-gray-600">酒水: 0.00</Text>
                  </View>
                </CollapseItem>
              </View>
              {array.map((item, index) => (
                <View
                  className="flex flex-row items-start px-4 gap-4"
                  key={index}
                >
                  <Text className="text-base font-medium color-blue-500">
                    {30 - index}号
                  </Text>
                  <CollapseItem>
                    <View className="flex flex-row justify-between mb-2">
                      <Text className="text-base text-gray-600">
                        香烟: 0.00
                      </Text>
                      <Text className="text-base text-gray-600">
                        非烟: 0.00
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between mb-2">
                      <Text className="text-base text-gray-600">
                        其它: 0.00
                      </Text>
                      <Text className="text-base text-gray-600">
                        酒水: 0.00
                      </Text>
                    </View>
                  </CollapseItem>
                </View>
              ))}
            </View>
          </ScrollView>
        </PullToRefresh>

        <CustomActionsheet
          ref={actionRef}
          actionList={[
            { label: "全部", value: null },
            { label: "云值守", value: 1 },
            { label: "有人值守", value: 2 },
          ]}
          actionCallbak={handleActionCallback}
        />
      </View>
    </Layout>
  );
}
