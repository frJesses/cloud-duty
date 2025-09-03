import Touch from "@/components/common/Touch";
import Layout from "@/layout";
import { View, Text, ScrollView } from "react-native";
import Svg, { Rect, Text as SvgText } from "react-native-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import CustomActionsheet, {
  ActionSheetRef,
  Action,
} from "@/components/common/ActionSheet";
import { useRef, useState } from "react";

export default function CommoditySales() {
  const [mode, setMode] = useState<Action>({ label: "全部", value: null });

  const actionRef = useRef<ActionSheetRef>(null);

  function handleActionCallback(item: Action) {
    setMode(item);
  }

  return (
    <Layout title="商品销量">
      <View className="h-full">
        <View className="flex flex-row bg-white py-2 border-b-[1px] border-[#f5f5f5]">
          <Touch
            className="flex-1 flex flex-row gap-2 justify-center"
            onPress={() => actionRef.current?.open()}
          >
            <Text className="text-base t-primary">请选择模式:</Text>
            <Text className="text-base t-second">{mode.label}</Text>
          </Touch>
          <Touch className="flex-1 flex flex-row gap-2 justify-center">
            <Text className="text-base t-primary">请选择分类:</Text>
            <Text className="text-base t-second">暂无</Text>
          </Touch>
        </View>
        <ScrollView className="bg-white">
          {new Array(20)
            .fill({
              code: "6978162390953",
              name: "小拉拉迷你牛肉味",
              count: 6,
            })
            .map((item, index) => (
              <View
                className="p-4 flex flex-col gap-2 border-b-[1px] border-[#f5f5f5]"
                key={index}
              >
                <Text className="color-second">商品名称: {item.name}</Text>
                <Text className="color-second">商品条码: {item.code}</Text>
                <Text className="color-second">商品销量: {item.count}</Text>
                <View className="items-center mt-2">
                  <Barcode
                    value="69487512336211"
                    text="69487512336211"
                    width={1.6}
                    height={50}
                    format="CODE128"
                  />
                </View>
              </View>
            ))}
        </ScrollView>

        <CustomActionsheet
          ref={actionRef}
          actionList={[
            { label: "全部", value: null },
            { label: "云值守", value: 1 },
            { label: "有人值守", value: 2 },
          ]}
          actionCallbak={handleActionCallback}
        />
      </View>
    </Layout>
  );
}
