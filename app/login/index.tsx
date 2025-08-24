import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // 模拟登录成功
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#333",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          欢迎登录
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#4A90E2",
            paddingHorizontal: 40,
            paddingVertical: 15,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            模拟登录
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
