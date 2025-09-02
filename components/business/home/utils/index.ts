export const BANNER_ICON = {
  "closing-record": require("@/assets/images/home/closing-record.png"),
  "category-statistics": require("@/assets/images/home/category-statistics.png"),
  "time-sharing-statistics": require("@/assets/images/home/time-sharing-statistics.png"),
  "product-sales": require("@/assets/images/home/product-sales.png"),
  "mode-change": require("@/assets/images/home/mode-change.png"),
  "duty-record": require("@/assets/images/home/duty-record.png"),
  "compensation-process": require("@/assets/images/home/compensation-process.png"),
}

export interface Banner {
  title: string
  iconKey: keyof typeof BANNER_ICON
  path: string
}

export const BANNER_LIST: Banner[] = [
  { title: "结班记录", iconKey: "closing-record", path: "statistics/ClosingStatistics" },
  { title: "分类统计", iconKey: "category-statistics", path: "statistics/CategoryStatistics" },
  { title: "分时统计", iconKey: "time-sharing-statistics", path: "statistics/TimeSharing" },
  { title: "商品销量", iconKey: "product-sales", path: "commodity/CommoditySales" },
  { title: "模式切换", iconKey: "mode-change", path: "" },
  { title: "值守记录", iconKey: "duty-record", path: "" },
  { title: "赔付进度", iconKey: "compensation-process", path: "" }
]