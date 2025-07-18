import { Box, Flex, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { ILocalMessage, MESSAGE_TYPE_PLAIN } from "@specs/threads";
import { tsToDateString } from "@helpers/time";
import Avatar from "./Avatar";

interface Props {
  message: ILocalMessage;
}

export default function PlainMessage({ message }: Props) {
  if (message.type !== MESSAGE_TYPE_PLAIN) return;
  return (
    <Box className={Styles.messageBox}>
      <Flex direction="column" gap="2">
        <Flex direction="row" style={{ justifyContent: "space-between", alignItems: "center", height: 38 }}>
          <Box>
            <Avatar from={message.username} />
          </Box>
          <MessageDate message={message} />
        </Flex>
        <Text size="2">{message.body}</Text>
      </Flex>
    </Box>
  );
}

function MessageDate({ message }: Props) {
  switch (message.sendStatus) {
    case "done":
      return <Box className={Styles.messageDate}>{tsToDateString(message.updated_at)}</Box>;
    case "pending":
      return <Box className={Styles.messageDate}>sending</Box>;
    case "failed":
      return <Box className={Styles.messageDate}>failed</Box>;
  }
}
