import { Flex } from "@radix-ui/themes";
import MainHeader from "../../Components/MainHeader/MainHeader";
import SendBox from "@components/SendBox/SendBox";
import MessageList from "@components/Content/MessageList";
import { useParams } from "react-router-dom";
import { sendMessage } from "@apis/threads";
import { useLoadingLastMessages, useThreadMessages } from "@helpers/hooks";
import { useEffect } from "react";
import { loadMessages } from "@providers/local";

export default function Thread() {
  const { id: threadId } = useParams() as { id: string };
  const isLoading = useLoadingLastMessages(threadId);
  const messages = useThreadMessages(threadId);

  useEffect(() => {
    loadMessages(threadId);
  }, [threadId]);

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
      {!isLoading && <MessageList messages={messages} />}
      <SendBox onSubmit={submit} />
    </Flex>
  );
}
