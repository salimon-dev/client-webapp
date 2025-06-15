import { Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { useMessages } from "@network/hooks";
import Messsage from "@components/Message/Message";
import { useAtomValue } from "jotai";
import { sendBoxHeightAtom } from "@providers/layout";

export default function Content() {
  const messages = useMessages();
  const sendBoxHeight = useAtomValue(sendBoxHeightAtom);
  return (
    <Flex
      direction="column-reverse"
      className={Styles.content}
      gap="3"
      style={{ maxHeight: `calc(100vh - ${sendBoxHeight}px)` }}
    >
      {messages.map((item) => (
        <Messsage message={item} key={item.id} />
      ))}
    </Flex>
  );
}
