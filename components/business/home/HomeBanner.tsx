import { Text, View, Image } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { BANNER_ICON, type Banner } from "./utils";
import { type Href, useRouter } from "expo-router";
import Touch from "@/components/common/Touch";
import { useCommonStore, useCurrentStore } from "@/store";
import { Skeleton } from "native-base";
import { getInspectionData } from "@/api/store";
import Storage from "@/utils/cache";
import { StorageKey } from "@/constants/storage";

export default function HomeBanner() {
  const router = useRouter();
  const [containerWidth, setContainerWidth] = useState(0);
  const currentStore = useCurrentStore();
  const { fetchConfig } = useCommonStore();
  const [banner, setBanner] = useState<Banner[]>([]);
  const [inspectionCount, setInspectionCount] = useState(0);

  const MIN_ITEM_WIDTH = 72;
  const H_GAP = 8;
  const H_PADDING = 8;

  const BANNER_LIST: Banner[] = [
    {
      title: "结班记录",
      iconKey: "closing-record",
      path: "statistics/ClosingStatistics",
    },
    {
      title: "分类统计",
      iconKey: "category-statistics",
      path: "statistics/CategoryStatistics",
    },
    {
      title: "分时统计",
      iconKey: "time-sharing-statistics",
      path: "statistics/TimeSharing",
    },
    {
      title: "数据统计",
      iconKey: "time-sharing-statistics",
      path: "",
      showMenu: async () => currentStore!.showOutOrderMenu,
    },
    {
      title: "商品销量",
      iconKey: "product-sales",
      path: "commodity/CommoditySales",
    },
    {
      title: "商品建档",
      iconKey: "product-create-record",
      path: "commodity/ProductFiling",
      showMenu: async () => currentStore!.showProductAndInventoryMenu,
    },
    {
      title: "库存管理",
      iconKey: "inventory-management",
      path: "commodity/InventoryManagement",
      showMenu: async () => currentStore!.showProductAndInventoryMenu,
    },
    {
      title: "模式切换",
      iconKey: "mode-change",
      path: "store/ChangeStoreMode",
      showMenu: async () =>
        !(
          currentStore!.extStore === 4 &&
          ["km20240130001", "testkm202312055158"].includes(
            currentStore!.extBrandNo
          )
        ),
    },
    {
      title: "外卖订单",
      iconKey: "takeout",
      path: "commodity/InventoryManagement",
      showMenu: async () => currentStore!.eshop,
    },
    { title: "硬件控制", iconKey: "hardware", path: "duty/DutyRecords" },
    { title: "营销管理", iconKey: "marketing", path: "duty/DutyRecords" },
    { title: "值守记录", iconKey: "duty-record", path: "duty/DutyRecords" },
    {
      title: "支付宝激励",
      iconKey: "alipayIncentive",
      path: "duty/DutyRecords",
      showMenu: async () => {
        return (
          currentStore!.hasIncentive && !currentStore!.isAuthorizationStore
        );
      },
    },
    {
      title: "设备自检",
      iconKey: "deviceSelfCheck",
      path: "duty/DutyRecords",
    },
    { title: "分类管理", iconKey: "category", path: "duty/DutyRecords" },
    {
      title: "货架亮灯",
      iconKey: "light",
      path: "duty/DutyRecords",
      showMenu: showLight,
    },
    {
      title: "赔付进度",
      iconKey: "compensation-process",
      path: "compensation/CompensationProgress",
    },
    {
      title: "处方药审方",
      iconKey: "medication",
      path: "duty/DutyRecords",
      showMenu: async () => currentStore!.isMedicineIndustry,
    },
    {
      title: "无线灯条",
      iconKey: "light",
      path: "duty/DutyRecords",
      showMenu: async () => currentStore!.useLightBar,
    },
    {
      title: "巡店整改",
      iconKey: "workOrder",
      path: "duty/DutyRecords",
      showMenu: showInspection,
    },
  ];

  async function showInspection() {
    const phone = await Storage.get(StorageKey.PHONE);
    if (!phone) {
      return false;
    }
    const res = await getInspectionData({
      pageSize: 10,
      pageNo: 1,
      userPhone: phone,
    });
    setInspectionCount(res?.toBeRectifiedNum || 0);
    return res?.show === 1;
  }

  async function showLight() {
    await fetchConfig();
    const { config } = useCommonStore.getState();
    return Boolean(config?.useShelfLight);
  }

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

  function handleItemPress(item: Banner) {
    if (item.path) {
      router.push(item.path as Href);
    }
  }

  useEffect(() => {
    initBanner();
  }, []);

  async function initBanner() {
    const initResult = new Array(16).fill(true);
    setBanner(initResult);
    const list = await Promise.allSettled(
      BANNER_LIST.map(async (item) => {
        item.show =
          typeof item.showMenu === "function" ? await item.showMenu() : true;
        item.done = true;
        return item;
      })
    );
    const result = list
      .filter((item) => item.status === "fulfilled")
      .map((item) => item.value)
      .filter((item) => item.show);
    setBanner(result);
  }

  return (
    <View
      className="rounded-lg bg-white p-2 mt-4 flex flex-wrap flex-row"
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {banner.map((item, idx) => (
        <View
          key={`banner-item-${idx}`}
          style={{
            width: itemWidth,
            marginRight: (idx + 1) % columns === 0 ? 0 : H_GAP,
            marginBottom: H_GAP,
          }}
        >
          <Touch
            className="items-center justify-center rounded-md flex flex-col gap-3 py-2"
            onPress={() => handleItemPress(item)}
          >
            <Skeleton
              key={item.title + idx}
              w="50"
              h="50"
              rounded="8"
              isLoaded={Boolean(item.done)}
            >
              <Image
                source={BANNER_ICON[item.iconKey]}
                className="w-[50px] h-[50px]"
              />
            </Skeleton>
            <Skeleton.Text
              lines={1}
              alignItems="center"
              w="10"
              isLoaded={Boolean(item.done)}
            >
              <Text className="text-[12px] text-[#333]">{item.title}</Text>
            </Skeleton.Text>
          </Touch>
        </View>
      ))}
    </View>
  );
}
