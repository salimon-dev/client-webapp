import { Box, Flex, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { IMessage } from "@specs/image";
import { dateTimeToRelative } from "@helpers/time";
import Avatar from "./Avatar";

interface IProps {
  message: IMessage;
}

export default function Message({ message }: IProps) {
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
