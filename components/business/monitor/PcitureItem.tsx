import { Text, View, Image } from "react-native";
import Touch from "@/components/common/Touch";

export default function PcitureItem() {
  return (
    <Touch
      className="relative"
      onPress={() => {
        console.log("点击查看");
      }}
    >
      <View className="bg-black rounded-lg aspect-[16/9]">
        <Image
          source={require("@/assets/images/monitor/video_img.png")}
          className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </View>
      <Touch
        onPress={() => {}}
        className="absolute w-16 h-16 right-2 bottom-2 border-[1px] border-[#aaa] p-4 rounded-full flex flex-col justify-center items-center gap-1 opacity-70"
      >
        <Image
          source={require("@/assets/images/monitor/detail.png")}
          className="w-7 h-7"
        />
        <Text className="text-xs text-white">回看</Text>
      </Touch>
      <Text className="absolute left-0 top-0 text-white text-[10px] py-1 pl-2">362455212222:2</Text>
    </Touch>
  );
}
