import Touch from "@/components/common/Touch";
import Layout from "@/layout";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function DutyRecords() {
  const router = useRouter();

  function handleDetailClick() {
    router.push("/duty/DutyRecordDetail");
  }

  return (
    <Layout title="值守记录">
      <View className="h-full">
        <ScrollView>
          <View className="px-4 py-2 flex flex-col gap-3">
            {new Array(20).fill(true).map((item, index) => (
              <Touch
                className="flex flex-col gap-2 p-3 bg-white rounded-lg"
                key={index}
                onPress={handleDetailClick}
              >
                <Text>切换云值守: 2025-01-09 17:47:47</Text>
                <Text>切换有人: 2025-01-09 17:47:47</Text>
                <Text>时长: 198天</Text>
                <Text>订单数: 147</Text>
                <Text>销售额: ￥0.00</Text>
              </Touch>
            ))}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
