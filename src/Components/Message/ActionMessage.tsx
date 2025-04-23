import { Box, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { MessageRecord } from "@network/specs";
import CircleIcon from "@icons/CircleIcon";

interface Props {
  message: MessageRecord;
}

export default function ActionMessage({ message }: Props) {
  return (
    <Box className={Styles.actionBox}>
      <CircleIcon type="warning" />
      <Text size="1">calling action {message.type}</Text>
    </Box>
  );
}
