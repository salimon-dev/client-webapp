import { Flex } from "@radix-ui/themes";
import MainHeader from "../../Components/ThreadHeader/ThreadHeader";
import SendBox from "@components/SendBox/SendBox";
import MessageList from "@components/Content/MessageList";
import { useParams } from "react-router-dom";
import { sendMessage } from "@apis/threads";
import { useActiveThread, useLoadingLastMessages, useThreadMessages } from "@helpers/hooks";
import { useEffect } from "react";
import { activeThreadIdAtom, appendLocalMessage, appendRemoteMessage, loadMessages } from "@providers/local";
import ThreadContentLoading from "@components/ThreadContentLoading/ThreadContentLoading";
import { useSetAtom } from "jotai";
import { MESSAGE_TYPE_PLAIN } from "@specs/threads";
import { useProfile } from "@providers/auth";

export default function Thread() {
  const { id: threadId } = useParams() as { id: string };
  const profile = useProfile();
  const isLoading = useLoadingLastMessages(threadId);
  const messages = useThreadMessages(threadId);
  const setActiveThreadId = useSetAtom(activeThreadIdAtom);
  const activeThread = useActiveThread();
  useEffect(() => {
    setActiveThreadId(threadId);
  }, [threadId, setActiveThreadId]);

  useEffect(() => {
    if (activeThread && activeThread.fetchedUntil === undefined) {
      loadMessages(activeThread.id);
    }
  }, [activeThread]);

  async function submit(body: string) {
    try {
      const localMessageId = Date.now() + "";
      appendLocalMessage({
        id: localMessageId,
        body,
        created_at: Math.ceil(Date.now() / 1000),
        updated_at: Math.ceil(Date.now() / 1000),
        thread_id: threadId,
        type: MESSAGE_TYPE_PLAIN,
        user_id: profile!.id,
        username: profile!.username,
        sendStatus: "pending",
      });
      const response = await sendMessage({ body, thread_id: threadId });
      appendRemoteMessage(response, localMessageId);
    } catch (e) {
      console.error(e);
    }
  }

  function isLoadingThread() {
    if (!activeThread) return true;
    return isLoading;
  }
  return (
    <Flex direction="column" style={{ flex: 1 }}>
      <MainHeader />
      {!isLoadingThread() && <MessageList messages={messages} />}
      {isLoadingThread() && <ThreadContentLoading message="loading messages ..." />}
      <SendBox onSubmit={submit} />
    </Flex>
  );
}
