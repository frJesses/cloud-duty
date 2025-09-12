import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

/**
 * 处理时间显示
 * 时间=今天，显示今天， showTime = true 显示时分
 * 时间=昨天，显示昨天 showTime = true 显示  昨天 + 时分
 * 时间小于昨天并且大于今年一月一号，则显示月-日 showTime = true 显示 月-日 + 时分
 * 或者显示年月日 showTime = true 显示 年-月-日 + 时分
 */

export function formatTimeToStr(time: string | number, showTime = false) {
  if (!time) return null;
  const currentDay = dayjs(time);
  // 昨天
  const yesterday = dayjs().subtract(1, "days").startOf("day");
  // 今天
  const today = dayjs().startOf("day");
  // 今年
  const startDateOfYear = dayjs().startOf("year");

  // 是否为今天
  if (currentDay.isSame(today, "day")) {
    return showTime ? currentDay.format("HH:mm") : "今天";
  }
  // 是否为昨天
  if (currentDay.isSame(yesterday, "day")) {
    return showTime ? `昨天 ${currentDay.format("HH:mm")}` : "昨天";
  }
  // 是否为 今年一月一号 <= target < 昨天
  if (currentDay.isBetween(startDateOfYear, yesterday, "day", "[]")) {
    return showTime
      ? `${currentDay.format("MM-DD HH:mm")}`
      : `${currentDay.format("MM-DD")}`;
  }
  return showTime
    ? `${currentDay.format("YYYY-MM-DD HH:mm")}`
    : `${currentDay.format("YYYY-MM-DD")}`;
}
