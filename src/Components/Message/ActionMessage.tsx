import { Box, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import CircleIcon from "@icons/CircleIcon";
import { ILocalMessage } from "@specs/threads";

interface Props {
  message: ILocalMessage;
}

export default function ActionMessage({ message }: Props) {
  return (
    <Box className={Styles.actionBox}>
      <CircleIcon type="warning" />
      <Text size="1">calling action {message.type}</Text>
    </Box>
  );
}
