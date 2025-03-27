import { Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { useMessages } from "@network/hooks";
import Messsage from "@components/Message/Message";

export default function Content() {
  const messages = useMessages();
  return (
    <Flex direction="column-reverse" className={Styles.content} gap="3">
      {messages.map((item) => (
        <Messsage message={item} key={item.id} />
      ))}
    </Flex>
  );
}
