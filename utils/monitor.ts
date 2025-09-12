export interface MonitorList {
  code: string;
  mode: string;
  pf: string;
  sn: string;
  [k: string]: any;
}

export const monitorType: Record<string, string> = {
  1: "ez",
  2: "tp",
  5: "qly",
};

function getUniqueCctv(data: Api.Response.MonitorItem): MonitorList[] {
  return Object.keys(data)
    .filter((_, i) => Object.keys(data)[i].startsWith("cctv"))
    .filter((v) => data[v] && typeof data[v] === "object")
    .map((v) => {
      const item = data[v];
      const pf = (item.pf || "").slice(0, 1);
      item.type = monitorType[pf] || "";
      return item;
    });
}

export function formatMonitor(data: Api.Response.MonitorItem | null) {
  if (!data) {
    return [];
  }
  return getUniqueCctv(data);
}
