import Touch from "@/components/common/Touch";
import { Image, View, Text } from "react-native";
import { iconMap, routerMap } from "./utils";
import dayjs from "dayjs";
import { Skeleton } from "native-base";
import { Href, useRouter } from "expo-router";

interface Props {
  itemData: Api.Response.Message;
  done: boolean;
}

export default function MessageItem({ itemData, done }: Props) {
  const router = useRouter();

  function handleItemClick() {
    const path = routerMap[itemData.type];
    if (!path) {
      return;
    }
    router.push({
      pathname: path as any,
      params: {
        type: itemData.type,
      },
    });
  }

  return (
    <Touch
      className="py-3 border-b-[1px] border-[#f5f5f5] flex flex-row gap-3"
      onPress={handleItemClick}
    >
      <Skeleton rounded="lg" width="12" height="12" isLoaded={done}>
        <Image source={iconMap[itemData.type]} className="w-14 h-14" />
      </Skeleton>
      <View className="flex-1 flex-col flex justify-between">
        <Skeleton height="4" w="50%" rounded="lg" isLoaded={done}>
          <Text className="text-base t-primary">{itemData.title}</Text>
        </Skeleton>
        <Skeleton height="4" w="100%" rounded="lg" isLoaded={done}>
          <Text className="text-base t-second" numberOfLines={1}>
            {itemData.alert}
          </Text>
        </Skeleton>
      </View>
      <View className="flex flex-col items-start justify-between min-w-16">
        <Skeleton height="4" w="100%" rounded="lg" isLoaded={done}>
          <Text className="text-base t-second">
            {dayjs(itemData.createdAt).format("YYYY-MM-DD")}
          </Text>
        </Skeleton>
        {Boolean(itemData.count) && (
          <Text className="px-2 bg-red-500 text-white rounded-full text-xs">
            {itemData.count}
          </Text>
        )}
      </View>
    </Touch>
  );
}
