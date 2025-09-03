import Layout from "@/layout";
import { Button } from "native-base";
import { Image, ScrollView, Text, View } from "react-native";

export default function ChangeStoreMode() {
  return (
    <Layout title="模式切换">
      <View className="h-full">
        <ScrollView>
          {new Array(20).fill(true).map((item, index) => (
            <View
              className="flex flex-row justify-between py-3 px-4 bg-white border-b-[1px] border-[#f5f5f5]"
              key={index}
            >
              <View className="flex flex-col gap-2 justify-center items-center">
                <Image
                  source={require("@/assets/images/store/person.png")}
                  className="w-15 h-15"
                />
                <Text className="color-second text-base">有人</Text>
              </View>
              <View className="flex flex-col gap-2 items-end">
                <Text>40617合同测试门店</Text>
                <Button className="rounded-full" rounded="full" px={8} py={2}>切换</Button>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}
