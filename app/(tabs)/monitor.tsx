import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import PcitureItem from "@/components/business/monitor/PcitureItem";
import Layout from "@/layout";
import CustomHeader from "@/components/common/CustomHeader";
import { getStoreMonitorDevices } from "@/api/store";
import { useCurrentStore } from "@/store";
import { formatMonitor, type MonitorList } from "@/utils/monitor";

export default function Monitor() {
  const [monitor, setMonitor] = useState<MonitorList[]>(
    new Array(6).fill({ done: false })
  );
  const store = useCurrentStore();

  useEffect(() => {
    getDeviceList();
  }, []);

  async function getDeviceList() {
    setTimeout(async () => {
      const res = await getStoreMonitorDevices();
      if (store) {
        const current = res.find((item) => item._id === store._id);
        if (current) {
          const monitor = formatMonitor(current).map((item) => ({
            ...item,
            done: true,
          }));
          setMonitor(monitor);
        }
      }
    }, 500);
  }

  return (
    <Layout>
      <View className="h-full">
        <CustomHeader title={`监控-${store?.name}`} showLeft={false} />
        <ScrollView>
          <View className="flex flex-col gap-3 px-3 pb-3">
            {monitor.map((item, index) => (
              <PcitureItem itemData={item} key={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
