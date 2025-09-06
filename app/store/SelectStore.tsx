import SearchBar from "@/components/common/SearchBar";
import Layout from "@/layout";
import { ScrollView, Text, View } from "react-native";
import { Badge } from "native-base";
import { useEffect } from "react";
import { useCommonStore } from "@/store";
import Touch from "@/components/common/Touch";
import { useRouter } from "expo-router";
import Storage from "@/utils/cache";
import { StorageKey } from "@/constants/storage";

function StoreItem({ itemData }: { itemData: Api.Response.StoreItem }) {
  const router = useRouter();
  const { setCurrentStore } = useCommonStore();

  async function handleItemClick() {
    await setCurrentStore(itemData);
    await Storage.set(StorageKey.CURRENTSTORE, itemData);
    router.back();
  }

  return (
    <Touch
      className="px-4 py-3 border-b-[1px] border-[#f5f5f5] flex flex-col gap-3"
      onPress={handleItemClick}
    >
      <View className="flex flex-row items-center gap-3">
        <Text className="text-[16px] t-primary">{itemData.name}</Text>
        {Boolean(itemData.isAuthorizationStore) && (
          <Badge
            variant="solid"
            colorScheme="cyan"
            style={{ paddingTop: 0, paddingBottom: 0 }}
            _text={{ fontSize: 12, color: "#fff" }}
          >
            授权门店
          </Badge>
        )}
      </View>
      <View className="flex flex-col gap-[3px]">
        <Text className="text-base t-second">{itemData.address}</Text>
        <Text className="text-base t-second">
          移动支付费率: {itemData.mobileFee}%
        </Text>
        <Text className="text-base t-second">
          云值守服务费率: {itemData.nohumanFee}%
        </Text>
        <Text className="text-base t-second">
          云值守服务率每日封顶金额: {itemData.nohumanFeeLimit || 0}(元)
        </Text>
      </View>
    </Touch>
  );
}

export default function SelectStore() {
  const { fetchStorePage, storeList } = useCommonStore();

  useEffect(() => {
    async function initData() {
      await fetchStorePage();
    }
    initData();
  }, []);

  return (
    <Layout title="选择店铺">
      <View className="h-full flex flex-col">
        <View className="my-3">
          <SearchBar />
        </View>
        <ScrollView className="h-full bg-white">
          {storeList.map((item) => (
            <StoreItem itemData={item} key={item._id} />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}
