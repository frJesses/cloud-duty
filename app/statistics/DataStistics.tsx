import Touch from "@/components/common/Touch";
import Layout from "@/layout";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryTheme,
} from "victory-native";

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
        <VictoryChart
          width={width}
          height={300}
          theme={VictoryTheme.material}
          padding={{ top: 40, bottom: 50, left: 40, right: 20 }}
          domainPadding={{ x: 20 }}
          domain={{
            x: [0, 6], // X轴从0开始到6
            y: [Math.max(0, minY - yPadding), maxY + yPadding], // 动态Y轴范围
          }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => `第${datum.x}天: ${datum.y}k`}
              labelComponent={
                <VictoryTooltip
                  style={{ fontSize: 12, fontWeight: "bold" }}
                  flyoutStyle={{
                    stroke: "#FF6B6B",
                    fill: "white",
                    strokeWidth: 2,
                  }}
                  cornerRadius={8}
                  pointerLength={6}
                />
              }
              activateData={true}
              activateLabels={true}
            />
          }
        >
          {/* 平滑的折线图 */}
          <VictoryLine
            data={data}
            interpolation="natural" // 使用自然插值实现平滑线条
            style={{
              data: {
                stroke: "#FF6B6B",
                strokeWidth: 3,
              },
            }}
          />

          {/* 数据点 */}
          <VictoryScatter
            data={data}
            size={6}
            style={{
              data: {
                fill: "#FF6B6B",
                stroke: "white",
                strokeWidth: 2,
              },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            labels={({ datum }) => `第${datum.x}天: ${datum.y}k`}
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 12, fontWeight: "bold" }}
                flyoutStyle={{
                  stroke: "#FF6B6B",
                  fill: "white",
                  strokeWidth: 2,
                }}
                cornerRadius={8}
                pointerLength={6}
              />
            }
          />

          {/* X轴 */}
          <VictoryAxis
            tickFormat={(t) => `第${t + 1}天`}
            style={{
              axis: { stroke: "#ccc", strokeWidth: 1 },
              tickLabels: { fontSize: 12, fill: "#666", padding: 5 },
              grid: { stroke: "#f0f0f0", strokeDasharray: "5,5" },
            }}
            tickCount={8}
            tickValues={[0, 1, 2, 3, 4, 5, 6]}
          />

          {/* Y轴 */}
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => {
              if (t >= 1000) {
                return `${(t / 1000).toFixed(1)}k`;
              }
              return `${t}`;
            }}
            style={{
              axis: { stroke: "#ccc", strokeWidth: 1 },
              tickLabels: { fontSize: 12, fill: "#666", padding: 5 },
              grid: { stroke: "#f0f0f0", strokeDasharray: "5,5" },
            }}
          />
        </VictoryChart>
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
