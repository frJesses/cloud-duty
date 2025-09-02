import React from "react";
import Layout from "@/layout";
import { Text, View, useWindowDimensions, Pressable } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Touch from "@/components/common/Touch";
import { Ionicons } from "@expo/vector-icons";

const FirstRoute = () => (
  <View className="flex-1 justify-center items-center">
    <Text>页面 1 内容</Text>
  </View>
);

const SecondRoute = () => (
  <View className="flex-1 justify-center items-center">
    <Text>页面 2 内容</Text>
  </View>
);

export default function ClosingStatistics() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "标签1" },
    { key: "second", title: "标签2" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <Layout
      title="结班记录"
      headerRight={
        <Touch>
          <Ionicons name="calendar" size={24} color="#333" />
        </Touch>
      }
    >
      <View className="h-full">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: "#EFF100",
                height: 3,
                borderRadius: 4,
              }}
              style={{
                backgroundColor: "transparent",
                shadowColor: "transparent",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
              }}
              pressOpacity={0}
              pressColor="transparent"
              inactiveColor="#333"
              activeColor="#333"
            />
          )}
        />
      </View>
    </Layout>
  );
}
