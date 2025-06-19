import { Flex } from "@radix-ui/themes";
import MainHeader from "../../Components/MainHeader/MainHeader";
import SendBox from "@components/SendBox/SendBox";
import MessageList from "@components/Content/MessageList";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { searchMessages, sendMessage } from "@apis/threads";

export default function Thread() {
  const { id: threadId } = useParams() as { id: string };
  const { data, isLoading } = useQuery({
    queryKey: ["messages", threadId],
    queryFn: () => {
      return searchMessages({ page: 1, page_size: 10, thread_id: threadId });
    },
  });

  function messages() {
    if (isLoading) return [];
    if (!data) return [];
    return data.data;
  }
  async function submit(body: string) {
    try {
      const response = await sendMessage({ body, thread_id: threadId });
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Flex direction="column" style={{ flex: 1 }}>
      <MainHeader />
      <MessageList messages={messages()} />
      <SendBox onSubmit={submit} />
    </Flex>
  );
}
