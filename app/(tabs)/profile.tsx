import { ScrollView, Text, View, Image } from "react-native";
import Layout from "@/layout";
import ListItem from "@/components/common/ListItem";

export default function Profile() {
  return (
    <Layout title="我的" showArrow={false}>
      <View className="h-full">
        <ScrollView>
          <View className="flex flex-row gap-4 px-4 mt-6">
            <View className="w-16 h-16 bg-yellow-300 rounded-full" />
            <View>
              <Text>15797698560</Text>
              <View className="flex flex-row items-center gap-4 mt-2 mb-4">
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
            </View>
          </View>
          <View className="flex flex-row gap-4 px-4 mt-8">
            <View className="relative flex-1 bg-white rounded-lg py-6 flex">
              <Image
                source={require("@/assets/images/profile/store.png")}
                className="w-16 h-16 absolute right-0 bottom-0"
              />
              <Text className="text-base pl-4">我的门店</Text>
            </View>
            <View className="relative flex-1 bg-white rounded-lg py-6 flex">
              <Image
                source={require("@/assets/images/profile/cashier.png")}
                className="w-16 h-16 absolute right-0 bottom-0"
              />
              <Text className="text-base pl-4">我的收银员</Text>
            </View>
          </View>
          <View className="mt-4">
            <ListItem
              title="服务费管理"
              icon={
                <Image
                  source={require("@/assets/images/profile/server-fee.png")}
                  className="w-6 h-6"
                />
              }
            />
            <ListItem
              title="我的店员/亲友"
              icon={
                <Image
                  source={require("@/assets/images/profile/assistant.png")}
                  className="w-6 h-6"
                />
              }
            />
            <ListItem
              title="设备绑定"
              icon={
                <Image
                  source={require("@/assets/images/profile/device-bind.png")}
                  className="w-6 h-6"
                />
              }
            />
            <ListItem
              title="医药设置"
              icon={
                <Image
                  source={require("@/assets/images/profile/device-bind.png")}
                  className="w-6 h-6"
                />
              }
            />
            <ListItem
              title="手机号授权"
              icon={
                <Image
                  source={require("@/assets/images/profile/auth.png")}
                  className="w-6 h-6"
                />
              }
            />
            <ListItem
              title="第三方账号绑定"
              icon={
                <Image
                  source={require("@/assets/images/profile/third-bind.png")}
                  className="w-6 h-6"
                />
              }
            />
             <ListItem
              title="关于应用"
              descTitle="5.26.3 - 2025.06.08"
              icon={
                <Image
                  source={require("@/assets/images/profile/about.png")}
                  className="w-6 h-6"
                />
              }
            />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
