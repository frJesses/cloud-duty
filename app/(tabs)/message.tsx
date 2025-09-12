import { ScrollView, View } from "react-native";
import Layout from "@/layout";
import MessageItem from "@/components/business/message/MessageItem";
import { getMessageList } from "@/api/message";
import { useCallback, useState } from "react";
import { usePageFocus } from "@/hooks/usePageFoucs";

const DEFAULT_LIST = new Array(6).fill({ type: "defalut" });

export default function Message() {
  const [messageList, setMessageList] =
    useState<Api.Response.Message[]>(DEFAULT_LIST);
  const [done, setDone] = useState(false);

  const fetchMessageList = useCallback(async () => {
    setMessageList(DEFAULT_LIST);
    setDone(false);
    setTimeout(async () => {
      const res = await getMessageList();
      setMessageList(res);
      setDone(true);
    }, 500);
  }, []);

  usePageFocus(fetchMessageList);

  return (
    <Layout title="消息中心" showArrow={false}>
      <View className="h-full bg-white px-3">
        <ScrollView>
          {messageList.map((item, index) => (
            <MessageItem itemData={item} done={done} key={item.type + index} />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
}
