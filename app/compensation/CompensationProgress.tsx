import Layout from "@/layout";
import { View, Text, ScrollView } from "react-native";
import CustomTabView from "@/components/common/CustomTabView";
import { Button } from "native-base";

function WaitHandle() {
  return (
    <View className="bg-white">
      <ScrollView>
        {new Array(10).fill(true).map((item, index) => (
          <View
            className="flex flex-col gap-3 py-3 px-4 border-b-[1px] border-[#f5f5f5]"
            key={index}
          >
            <View className="flex flex-row justify-end">
              <Text className="text-base color-red-600">已确认</Text>
            </View>
            <Text className="text-base t-primary">
              赔付发起时间: 2025-06-07 13:51:25
            </Text>
            <Text className="text-base t-primary">
              事件发生时间: 2025-06-07 13:51:25
            </Text>
            <View className="flex flex-row justify-end gap-2">
              <Button rounded="full" px={6} py={1.5} _text={{ color: "black" }}>
                放弃赔付
              </Button>
              <Button rounded="full" px={6} py={1.5} _text={{ color: "black" }}>
                去确认
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default function CompensationProgress() {
  return (
    <Layout title="赔付进度">
      <View className="h-full">
        <CustomTabView
          tabMap={[
            { key: "doing", title: "待我处理" },
            { key: "all", title: "全部" },
          ]}
          sceneMap={{
            doing: WaitHandle,
            all: WaitHandle,
          }}
          tabBarBg="#FFFFFF"
        />
      </View>
    </Layout>
  );
}
