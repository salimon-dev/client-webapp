import { Box, Flex, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { IMessage, MESSAGE_TYPE_PLAIN } from "@specs/threads";
import { tsToDateString } from "@helpers/time";
import Avatar from "./Avatar";

interface Props {
  message: IMessage;
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
          <Box className={Styles.messageDate}>{tsToDateString(message.updated_at)}</Box>
        </Flex>
        <Text size="2">{message.body}</Text>
      </Flex>
    </Box>
  );
}
