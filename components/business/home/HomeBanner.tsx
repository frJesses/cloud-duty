import { Text, View, Image, TouchableOpacity } from "react-native";
import { useMemo, useState } from "react";
import { BANNER_LIST, BANNER_ICON } from "./utils";

export default function HomeBanner() {
  const [containerWidth, setContainerWidth] = useState(0);

  const MIN_ITEM_WIDTH = 72;
  const H_GAP = 8;
  const H_PADDING = 8;

  const { columns, itemWidth } = useMemo(() => {
    if (containerWidth <= 0) return { columns: 1, itemWidth: containerWidth };
    const usableWidth = Math.max(containerWidth - H_PADDING * 2, 0);
    const maxCols = Math.max(
      Math.floor((usableWidth + H_GAP) / (MIN_ITEM_WIDTH + H_GAP)),
      1
    );
    const cols = maxCols;
    const totalGaps = (cols - 1) * H_GAP;
    const width =
      cols > 0 ? Math.floor((usableWidth - totalGaps) / cols) : usableWidth;
    return { columns: cols, itemWidth: width };
  }, [containerWidth]);

  return (
    <View
      className="rounded-lg bg-white p-2 mt-4 flex flex-wrap flex-row"
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {BANNER_LIST.map((item, idx) => (
        <View
          key={item.title + idx}
          style={{
            width: itemWidth,
            marginRight: (idx + 1) % columns === 0 ? 0 : H_GAP,
            marginBottom: H_GAP,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            className="items-center justify-center rounded-md flex flex-col gap-3 py-2"
          >
            <Image
              source={BANNER_ICON[item.iconKey]}
              className="w-[50px] h-[50px]"
            />
            <Text className="text-[12px] text-[#333]">{item.title}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
