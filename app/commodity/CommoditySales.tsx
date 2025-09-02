import Touch from "@/components/common/Touch";
import Layout from "@/layout";
import { View, Text, ScrollView } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";
import { useEffect, useState } from "react";

// 生成条码的辅助函数
function generateBarcodeData(barcode: string) {
  const bars: { x: number; width: number; height: number }[] = [];
  let currentX = 0;
  const barWidth = 2;
  const barHeight = 60;

  // 简单的条码生成逻辑（这里用随机数据演示）
  // 实际项目中应该使用专门的条码生成库
  for (let i = 0; i < 20; i++) {
    const isBar = Math.random() > 0.5;
    if (isBar) {
      bars.push({
        x: currentX,
        width: barWidth,
        height: barHeight,
      });
    }
    currentX += barWidth;
  }

  return bars;
}

export default function CommoditySales() {
  const [barcodeData] = useState(() => generateBarcodeData("6978162390953"));

  return (
    <Layout title="商品销量">
      <View className="h-full">
        <View className="flex flex-row bg-white py-2 border-b-[1px] border-[#f5f5f5]">
          <Touch className="flex-1 flex flex-row gap-2 justify-center">
            <Text className="text-base t-primary">请选择模式:</Text>
            <Text className="text-base t-second">全部</Text>
          </Touch>
          <Touch className="flex-1 flex flex-row gap-2 justify-center">
            <Text className="text-base t-primary">请选择模式:</Text>
            <Text className="text-base t-second">暂无</Text>
          </Touch>
        </View>
        <ScrollView className="bg-white">
          <View className="p-4">
            <Text className="text-lg font-bold mb-4">条码示例</Text>
            <View className="items-center">
              <Svg
                width={300}
                height={120}
                className="bg-white border border-gray-200 rounded"
              >
                {/* 条码线条 */}
                {barcodeData.map((bar, index) => (
                  <Rect
                    key={index}
                    x={bar.x}
                    y={10}
                    width={bar.width}
                    height={bar.height}
                    fill="#000"
                  />
                ))}
                {/* 条码下方的文字 */}
                <SvgText
                  x="50%"
                  y={95}
                  fontSize="12"
                  fill="#333"
                  textAnchor="middle"
                >
                  6978162390953
                </SvgText>
              </Svg>
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
