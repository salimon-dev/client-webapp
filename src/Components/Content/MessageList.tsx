import { Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { useAtomValue } from "jotai";
import { sendBoxHeightAtom } from "@providers/layout";
import { IMessage } from "@specs/threads";
import Message from "@components/Message/Message";

interface IProps {
  messages: IMessage[];
}
export default function MessageList({ messages }: IProps) {
  const sendBoxHeight = useAtomValue(sendBoxHeightAtom);
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
    </Flex>
  );
}
