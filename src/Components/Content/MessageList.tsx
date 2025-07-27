import { Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { useAtomValue } from "jotai";
import { sendBoxHeightAtom } from "@providers/layout";
import { ILocalMessage } from "@specs/threads";
import Message from "@components/Message/Message";
import { activeThreadIdAtom, loadOlderMessagesFromThread } from "@providers/local";
import { useLoadingMoreMessages } from "@helpers/hooks";

interface IProps {
  messages: ILocalMessage[];
}
export default function MessageList({ messages }: IProps) {
  const sendBoxHeight = useAtomValue(sendBoxHeightAtom);
  const activeThreadId = useAtomValue(activeThreadIdAtom);
  const loadingMoreMessages = useLoadingMoreMessages(activeThreadId!);
  return (
    <Flex
      direction="column-reverse"
      className={Styles.content}
      gap="3"
      style={{ maxHeight: `calc(100vh - ${sendBoxHeight}px)` }}
    >
      {messages.map((item) => (
        <Message message={item} key={item.id} />
      ))}
      <div
        className={Styles.loadMore}
        onClick={() => {
          loadOlderMessagesFromThread(activeThreadId!);
        }}
      >
        <div className={Styles.splitter} />
        {loadingMoreMessages ? <div>Loading...</div> : <div>load older messages</div>}
        <div className={Styles.splitter} />
      </div>
    </Flex>
  );
}
