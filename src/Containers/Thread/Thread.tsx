import { Flex } from "@radix-ui/themes";
import MainHeader from "../../Components/MainHeader/MainHeader";
import SendBox from "@components/SendBox/SendBox";
import MessageList from "@components/Content/MessageList";

export default function Thread() {
  return (
    <Flex direction="column" style={{ flex: 1 }}>
      <MainHeader />
      <MessageList />
      <SendBox />
    </Flex>
  );
}
