export const BANNER_ICON = {
  "closing-record": require("@/assets/images/home/closing-record.png"),
  "category-statistics": require("@/assets/images/home/category-statistics.png"),
  "time-sharing-statistics": require("@/assets/images/home/time-sharing-statistics.png"),
  "product-sales": require("@/assets/images/home/product-sales.png"),
  "mode-change": require("@/assets/images/home/mode-change.png"),
  "duty-record": require("@/assets/images/home/duty-record.png"),
  "compensation-process": require("@/assets/images/home/compensation-process.png"),
  "product-create-record": require("@/assets/images/home/product-create-record.png"),
  "inventory-management": require("@/assets/images/home/inventory-management.png"),
  "data-statistics": require("@/assets/images/home/data-statistics.png"),
  takeout: require("@/assets/images/home/takeout.png"),
  hardware: require("@/assets/images/home/hardware.png"),
  marketing: require("@/assets/images/home/marketing.png"),
  alipayIncentive: require("@/assets/images/home/alipayIncentive.png"),
  deviceSelfCheck: require("@/assets/images/home/deviceSelfCheck.png"),
  category: require("@/assets/images/home/category.png"),
  light: require("@/assets/images/home/light.png"),
  medication: require("@/assets/images/home/medication.png"),
  workOrder: require("@/assets/images/home/workOrder.png"),
};

export interface Banner {
  title: string;
  iconKey: keyof typeof BANNER_ICON;
  path: string;
  showMenu?: () => Promise<boolean>;
  show?: boolean;
}
