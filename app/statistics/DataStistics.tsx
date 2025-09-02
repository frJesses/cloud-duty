import Touch from "@/components/common/Touch";
import Layout from "@/layout";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function DataStistics() {
  // 示例数据
  const data = [
    { x: 0, y: 20 },
    { x: 1, y: 133 },
    { x: 2, y: 500 },
    { x: 3, y: 449 },
    { x: 4, y: 1000 },
    { x: 5, y: 600 },
    { x: 6, y: 800 },
  ];

  // 动态计算Y轴范围
  const maxY = Math.max(...data.map((d) => d.y));
  const minY = Math.min(...data.map((d) => d.y));
  const yRange = maxY - minY;
  const yPadding = yRange * 0.1; // 上下各留10%的padding

  return (
    <Layout
      title="数据统计"
      headerRight={
        <Touch>
          <Ionicons name="calendar" size={24} color="#333" />
        </Touch>
      }
    >
      <View style={styles.container}>
        
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
});
