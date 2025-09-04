import { View, Text, ScrollView } from "react-native";
import PcitureItem from "@/components/business/monitor/PcitureItem";
import Layout from "@/layout";
import CustomHeader from "@/components/common/CustomHeader";

export default function Monitor() {
  return (
    <Layout>
      <View className="h-full">
        <CustomHeader title="监控-T0001帮客体验店" showLeft={false} />
        <ScrollView>
          <View className="flex flex-col gap-3 px-3 pb-3">
            <PcitureItem />
            <PcitureItem />
            <PcitureItem />
            <PcitureItem />
            <PcitureItem />
            <PcitureItem />
            <PcitureItem />
            <PcitureItem />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
