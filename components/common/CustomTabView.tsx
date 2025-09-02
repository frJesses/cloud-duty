import React from "react";
import {
  TabView,
  SceneMap,
  TabBar,
  type TabViewProps,
} from "react-native-tab-view";

type RouteMap = { key: string; title: string };

interface Props<Route extends { key: string } = { key: string }>
  extends Omit<
    TabViewProps<Route>,
    "onIndexChange" | "renderScene" | "navigationState"
  > {
  tabMap: RouteMap[];
  sceneMap: { [key: string]: React.ComponentType };
}

export default function CustomTabView({
  tabMap,
  sceneMap,
  ...otherProps
}: Props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabMap);

  const renderScene = SceneMap(sceneMap);

  return (
    <TabView
      {...otherProps}
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
  );
}
