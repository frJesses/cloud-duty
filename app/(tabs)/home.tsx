import { View, ScrollView } from "react-native";
import Layout from "@/layout";
import HomeHeader from "@/components/business/home/HomeHeader";
import HomeBanner from "@/components/business/home/HomeBanner";
import HomeStatistice from "@/components/business/home/HomeStatistics";
import HomeSubBanner from "@/components/business/home/HomeSubBanner";
import HomeToDoList from "@/components/business/home/HomeToDoList";

export default function HomeScreen() {
  return (
    <Layout>
      <View className="h-full p-3">
        <HomeHeader />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeStatistice />
          <HomeSubBanner />
          <HomeToDoList />
          <HomeBanner />
        </ScrollView>
      </View>
    </Layout>
  );
}
