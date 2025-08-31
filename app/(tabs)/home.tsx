import { View, ScrollView } from "react-native";
import Layout from "@/layout";
import PullToRefresh from "@/components/common/PullToRefresh";
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
        <PullToRefresh
          onRefresh={() => new Promise((res) => setTimeout(res, 2000))}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <HomeStatistice />
            <HomeSubBanner />
            <HomeToDoList />
            <HomeBanner />
          </ScrollView>
        </PullToRefresh>
      </View>
    </Layout>
  );
}
