import { FlashList } from "@shopify/flash-list";
import type { ListRenderItem } from "@shopify/flash-list";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";

interface Props<TItem> {
  renderItem: ListRenderItem<TItem>;
  loadData: (page: number, size: number) => Promise<Api.RefreshData<TItem>>;
  keyExtractor?: (item: TItem, index: number) => string;
  estimatedItemSize?: number;
  transformData?: (item: TItem[]) => TItem[];
  initPage?: number;
  itemSeparatorHeight?: number;
}

const REFRESH_STATUS = {
  loading: 0,
  done: 1,
  empty: 2,
  error: 3,
};

export default function CustomFlatList<TItem>(props: Props<TItem>) {
  const {
    renderItem,
    keyExtractor = (_item, index) => String(index),
    estimatedItemSize = 56,
    loadData,
    initPage = 1,
    transformData,
    itemSeparatorHeight = 12,
  } = props;

  const queryInfo = useRef<Api.Request.Page>({
    page: initPage,
    size: 10,
  });
  const total = useRef(0);
  const [result, setResult] = useState<TItem[]>([]);
  const refreshState = useRef(-1);

  useEffect(() => {
    initLoad();
  }, []);

  async function initLoad() {
    try {
      // if (queryInfo.current.page! > total.current) {
      //   refreshState.current = REFRESH_STATUS.done;
      //   return;
      // }
      const res = await loadData(
        queryInfo.current.page!,
        queryInfo.current.size!
      );
      // 如果res返回的直接是一个数组
      if (Array.isArray(res)) {
        refreshState.current = res.length
          ? REFRESH_STATUS.done
          : REFRESH_STATUS.empty;
        setResult(res);
        return;
      }
      let { data, totalPage } = res;
      total.current = totalPage;
      if (transformData) {
        data = transformData(data);
      }
      const noMore = total.current === totalPage;
      refreshState.current = noMore
        ? REFRESH_STATUS.done
        : REFRESH_STATUS.loading;
      if (!data.length) {
        refreshState.current = REFRESH_STATUS.empty;
      }
      setResult([...result, ...data]);
    } catch (err) {
      console.log("加载列表出现错误---->>>", err);
      setResult([]);
      refreshState.current = REFRESH_STATUS.error;
      total.current = 0;
    }
  }

  return (
    <FlashList
      data={result}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={estimatedItemSize}
      ItemSeparatorComponent={() => (
        <View style={{ height: itemSeparatorHeight }} />
      )}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      ListFooterComponent={() => <View style={{ height: itemSeparatorHeight }} />}
    />
  );
}
