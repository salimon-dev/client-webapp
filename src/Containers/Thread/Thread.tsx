import { Flex } from "@radix-ui/themes";
import MainHeader from "../../Components/MainHeader/MainHeader";
import SendBox from "@components/SendBox/SendBox";
import MessageList from "@components/Content/MessageList";
import { useParams } from "react-router-dom";
import { sendMessage } from "@apis/threads";
import { useLoadingLastMessages, useThreadMessages } from "@helpers/hooks";
import { useEffect } from "react";
import { activeThreadIdAtom, appendMessage, loadMessages } from "@providers/local";
import ThreadContentLoading from "@components/ThreadContentLoading/ThreadContentLoading";
import { useSetAtom } from "jotai";

export default function Thread() {
  const { id: threadId } = useParams() as { id: string };
  const isLoading = useLoadingLastMessages(threadId);
  const messages = useThreadMessages(threadId);
  const setActiveThread = useSetAtom(activeThreadIdAtom);

  useEffect(() => {
    setActiveThread(threadId);
    loadMessages(threadId);
  }, [threadId, setActiveThread]);

  async function submit(body: string) {
    try {
      const response = await sendMessage({ body, thread_id: threadId });
      appendMessage(response);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Flex direction="column" style={{ flex: 1 }}>
      <MainHeader />
      {!isLoading && <MessageList messages={messages} />}
      {isLoading && <ThreadContentLoading message="loading messages ..." />}
      <SendBox onSubmit={submit} />
    </Flex>
  );
}
