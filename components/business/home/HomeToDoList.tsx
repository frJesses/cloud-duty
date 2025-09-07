import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomBadge from "@/components/common/CustomBadge";
import Touch from "@/components/common/Touch";
import { useEffect } from "react";
import { useHomeRefresh } from "./context/HomeContext";
import { type Result, useHomeToDoList } from "@/hooks/useHomeTodoList";
import { useRouter } from "expo-router";

export default function HomeToDoList() {
  const { refreshCount } = useHomeRefresh();
  const { result, runTask } = useHomeToDoList();
  const router = useRouter();

  function handleMoreClick() {
    router.push("/todoList");
  }

  useEffect(() => {
    runTask();
  }, [refreshCount]);

  return (
    <View className="mt-4 p-4 bg-white rounded-lg flex flex-col gap-3">
      <View className="border-b-[1px] pb-2 border-dashed border-[#f5f5f5] flex flex-row items-center justify-between">
        <Text className="t-primary text-base">待办列表</Text>
        <Touch className="flex flex-row" onPress={handleMoreClick}>
          <Text className="t-second text-sm">查看更多</Text>
          <Ionicons name="chevron-forward" size={18} color="#9E9E9E" />
        </Touch>
      </View>
      <ScrollView
        style={{ maxHeight: 100 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View className="flex flex-col gap-3">
          {result.map((item) => (
            <ToDoListItem {...item} key={item.key} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function ToDoListItem(props: Result) {
  const { name } = props;

  return (
    <View className="flex flex-row items-center gap-2 border-b-[1px] pb-2 border-dashed border-[#f5f5f5]">
      <CustomBadge borderColor="#FF6B6B" variant="outline">
        待办
      </CustomBadge>
      <Touch className="flex flex-row items-center flex-1">
        <Text className="flex-1 t-primary text-base" numberOfLines={1}>
          {name}
        </Text>
        <Ionicons name="chevron-forward" size={18} color="#9E9E9E" />
      </Touch>
    </View>
  );
}
