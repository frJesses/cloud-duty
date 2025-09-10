import { View } from "react-native";
import { Button } from "native-base";
import Layout from "@/layout";
import ListItem from "@/components/common/ListItem";
import { useRouter } from "expo-router";
import Storage from "@/utils/cache";

export default function ProfileSetting() {
  const router = useRouter();

  async function handleLogoutClick() {
    await Storage.clean();
    router.replace("/login");
  }

  return (
    <Layout title="设置">
      <View>
        <ListItem title="修改密码" isLink />
        <ListItem title="注销账号" isLink />
        <View className="mt-4 px-4">
          <Button colorScheme="danger" onPress={handleLogoutClick}>
            退出登录
          </Button>
        </View>
      </View>
    </Layout>
  );
}
