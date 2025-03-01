import { Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import Message from "./Message";

export default function Content() {
  return (
    <Flex direction="column-reverse" className={Styles.content} gap="3">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </Flex>
  );
}
