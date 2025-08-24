import { Button, Text } from "native-base";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const handleClickItem = () => {
    router.push("/login");
  };

  return (
    <SafeAreaView>
      <View className="w-[100] h-[100] bg-blue-500" />
      <Text fontSize="lg" mb="4" className="bg-blue">
        Hello NativeBase
      </Text>
      <Button onPress={handleClickItem}>点我</Button>
    </SafeAreaView>
  );
}
