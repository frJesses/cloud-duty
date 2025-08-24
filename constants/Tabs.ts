interface Tabs {
  name: string
  activeIcon: string
  icon: string
  path: string
}

export const TABS_LIST: Tabs[] = [
  { name: "首页", activeIcon: "home", icon: "home-outline", path: "index" },
  { name: "监控", activeIcon: "analytics", icon: "analytics-outline", path: "monitor" },
  { name: "消息", activeIcon: "chatbubbles", icon: "chatbubbles-outline", path: "message" },
  { name: "我的", activeIcon: "person", icon: "person-outline", path: "profile" },
]