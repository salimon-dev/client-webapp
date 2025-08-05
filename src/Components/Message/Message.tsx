import { Box, Flex } from "@radix-ui/themes";
import { ILocalMessage, MESSAGE_TYPE_PAYMENT, MESSAGE_TYPE_PLAIN } from "@specs/threads";
import Styles from "./styles.module.css";
import MessageDate from "./MessageDate";
import Avatar from "./Avatar";
import PlainMessage from "./PlainMessage";
import PaymentMessage from "./PaymentMessage";

interface Props {
  message: ILocalMessage;
}

export default function Message({ message }: Props) {
  return (
    <Box className={Styles.messageBox}>
      <Flex direction="column" gap="2">
        <Flex direction="row" style={{ justifyContent: "space-between", alignItems: "center", height: 38 }}>
          <Box>
            <Avatar from={message.username} />
          </Box>
          <MessageDate message={message} />
        </Flex>
        <Content message={message} />
      </Flex>
    </Box>
  );
}

function Content({ message }: Props) {
  switch (message.type) {
    case MESSAGE_TYPE_PLAIN:
      return <PlainMessage message={message} />;
    case MESSAGE_TYPE_PAYMENT:
      return <PaymentMessage message={message} />;
  }
}
