export const routerMap: Record<Api.MessageType, string> = {
  DutyReport: "/message/DutyReport",
  DeviceMalfunction: "/message/DeviceMalfunction",
  ScreenshotReport: "/message/ScreenshotReport",
  StealMissPay: "/message/StealMissPay",
  ReturnDevice: "/message/ReturnDevice",
};

export const iconMap: Record<Api.MessageType, any> = {
  DutyReport: require("@/assets/images/message/dutyReport.png"),
  DeviceMalfunction: require("@/assets/images/message/deviceMalfunction.png"),
  ScreenshotReport: require("@/assets/images/message/screenshot.png"),
  StealMissPay: require("@/assets/images/home/compensation-process.png"),
  ReturnDevice: require("@/assets/images/home/workOrder.png"),
};
