import { Box, Flex, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { MessageRecord } from "@network/specs";
import { dateTimeToRelative } from "@helpers/time";
import Avatar from "./Avatar";

interface Props {
  message: MessageRecord;
}

export default function Message({ message }: Props) {
  return (
    <Box className={Styles.messageBox}>
      <Flex direction="column" gap="2">
        <Flex direction="row" style={{ justifyContent: "space-between", alignItems: "center", height: 38 }}>
          <Box>
            <Avatar from={message.from} />
          </Box>
          <Box className={Styles.messageDate}>{dateTimeToRelative(message.sentAt)}</Box>
        </Flex>
        <Text>{message.body}</Text>
      </Flex>
    </Box>
  );
}
