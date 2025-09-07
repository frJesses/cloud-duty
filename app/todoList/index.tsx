import Layout from "@/layout";
import { Text, View, Image } from "react-native";
import { useHomeToDoList } from "@/hooks/useHomeTodoList";
import { useEffect } from "react";
import { Skeleton } from "native-base";
import Touch from "@/components/common/Touch";

export default function ToDoListPage() {
  const { result, runTask, isLoaded } = useHomeToDoList();

  useEffect(() => {
    runTask();
  }, []);

  console.log(isLoaded, "isLoaded");

  return (
    <Layout title="待办列表">
      <View className="h-full flex flex-col gap-3 bg-white">
        {result.map((item) => (
          <Touch
            key={item.name + item.key}
            className="flex flex-row gap-3 px-4 py-2 border-b-[1px] border-[#f5f5f5] overflow-hidden"
          >
            <Skeleton h="60" w="60" rounded={8} isLoaded={isLoaded}>
              <Image
                className="w-[60] h-[60]"
                source={require("@/assets/images/home/alipayIncentive.png")}
              />
            </Skeleton>
            <Skeleton.Text
              lines={2}
              className="flex-1 flex flex-col justify-around"
              isLoaded={isLoaded}
            >
              <View className="flex flex-col justify-around">
                <Text className="t-primary text-[16px]">{item.name}</Text>
                <Text className="t-second text-base">我是标题的秒速</Text>
              </View>
            </Skeleton.Text>
          </Touch>
        ))}
      </View>
    </Layout>
  );
}
