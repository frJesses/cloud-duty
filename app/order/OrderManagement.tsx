import Layout from "@/layout";
import { ScrollView, View } from "react-native";
import Touch from "@/components/common/Touch";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "@/components/common/SearchBar";
import CustomTabView from "@/components/common/CustomTabView";
import OrderItem from "@/components/common/OrderItem";

function OrderTab() {
  return (
    <View>
      <ScrollView>
        <View className="mb-2">
          <OrderItem />
        </View>
        <View className="mb-2">
          <OrderItem />
        </View>
        <View className="mb-2">
          <OrderItem />
        </View>
        <View className="mb-2">
          <OrderItem />
        </View>
        <View className="mb-2">
          <OrderItem />
        </View>
      </ScrollView>
    </View>
  );
}

export default function OrderManagement() {
  return (
    <Layout
      title="订单管理"
      headerRight={
        <Touch>
          <Ionicons name="calendar" size={24} color="#333" />
        </Touch>
      }
    >
      <View className="h-full">
        <View className="mt-2">
          <SearchBar placeholder="微信支付码" />
        </View>
        <CustomTabView
          tabMap={[
            { key: "all", title: "全部" },
            { key: "live", title: "云值守" },
            { key: "cash", title: "现金收银" },
            { key: "refund", title: "退款订单" },
          ]}
          sceneMap={{
            all: OrderTab,
            live: OrderTab,
            cash: OrderTab,
            refund: OrderTab,
          }}
        />
      </View>
    </Layout>
  );
}
