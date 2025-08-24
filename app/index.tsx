import { Redirect } from "expo-router";

export default function Index() {
  // 直接重定向到启动屏
  return <Redirect href="/splashScreen" />;
}
