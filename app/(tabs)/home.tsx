import { View, ScrollView } from "react-native";
import { useCallback } from "react";
import Layout from "@/layout";
import HomeHeader from "@/components/business/home/HomeHeader";
import HomeBanner from "@/components/business/home/HomeBanner";
import HomeStatistice from "@/components/business/home/HomeStatistics";
import HomeSubBanner from "@/components/business/home/HomeSubBanner";
import HomeToDoList from "@/components/business/home/HomeToDoList";
import HomeProvider, {
  useHomeRefresh,
} from "@/components/business/home/context/HomeContext";
import { usePageFocus } from "@/hooks/usePageFoucs";

function HomeContent() {
  const { setRefreshCount } = useHomeRefresh();

  const handlePageFocus = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
  }, [setRefreshCount]);

  usePageFocus(handlePageFocus, true);

  return (
    <Layout>
      <View className="h-full p-3">
        <HomeHeader />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeStatistice />
          <HomeToDoList />
          <HomeSubBanner />
          <HomeBanner />
        </ScrollView>
      </View>
    </Layout>
  );
}

export default function HomeScreen() {
  return (
    <HomeProvider>
      <HomeContent />
    </HomeProvider>
  );
}
