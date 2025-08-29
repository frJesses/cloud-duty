import React, { useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  LayoutChangeEvent,
  ScrollView,
  Text,
} from "react-native";

type Props = {
  children: React.ReactElement;
  onRefresh: () => Promise<void> | void;
  refreshHeight?: number;
  renderHeader?: (refreshing: boolean, pullDistance: number) => React.ReactNode;
};

const pageCom = () => {
  return (
    <ScrollView overScrollMode="never">
      <View style={{ height: 1000, backgroundColor: "#eee" }}>
        <Text style={{ padding: 20 }}>ScrollView 内容</Text>
      </View>
    </ScrollView>
  );
};

export default function PullToRefresh({
  children = pageCom(),
  onRefresh,
  refreshHeight = 80,
}: Props) {
  const pullY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      // 让 PanResponder 更容易接管
      onMoveShouldSetPanResponder: (_, gesture) => {
        // 1. 垂直方向为主 && 向下拉
        const isVertical = Math.abs(gesture.dy) > Math.abs(gesture.dx);
        return isVertical && gesture.dy > 2;
      },

      // 允许多次判断（比上面更精确）
      onPanResponderMove: (_, gesture) => {
        if (scrollY <= 0 && gesture.dy > 0) {
          // ✅ 只有在顶部才处理
          pullY.setValue(gesture.dy / 2); // 阻尼效果
        }
      },

      onPanResponderRelease: async (_, gesture) => {
        if (scrollY <= 0 && gesture.dy > refreshHeight) {
          // ✅ 顶部并且下拉超过阈值，触发刷新
          setRefreshing(true);

          Animated.timing(pullY, {
            toValue: headerHeight,
            duration: 200,
            useNativeDriver: false,
          }).start();

          await onRefresh?.();
          setRefreshing(false);

          Animated.timing(pullY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else {
          // 松手但没到阈值 → 复位
          Animated.timing(pullY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      {/* 刷新头部 */}
      <Animated.View
        onLayout={(e: LayoutChangeEvent) =>
          setHeaderHeight(e.nativeEvent.layout.height)
        }
        style={[
          styles.header,
          {
            height: pullY,
          },
        ]}
      >
        <Animated.Text>下拉刷新</Animated.Text>
      </Animated.View>

      {React.cloneElement(children, {
        scrollEventThrottle: 16,
        onScroll: (e: any) => {
          setScrollY(e.nativeEvent.contentOffset.y);
          children.props.onScroll?.(e);
        },
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
