import SearchBar from "@/components/common/SearchBar";
import Layout from "@/layout";
import { ScrollView, Text, View } from "react-native";
import PullToRefresh from "@/components/common/PullToRefresh";

export default function SelectStore() {
  return (
    <Layout>
      <View className="h-full">
        <View className="mt-3">
          <SearchBar />
        </View>
        <PullToRefresh onRefresh={() => {}}>
          <ScrollView>
            <View>
              <Text></Text>
            </View>
          </ScrollView>
        </PullToRefresh>
      </View>
    </Layout>
  );
}
