import { Box, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { IMessage } from "@specs/threads";

interface Props {
  message: IMessage;
}

// TODO: make this a component
// function actionResultStatus(message: IMessage): "success" | "error" | "warning" {
//   // unknown state
//   if (message.type !== "actionResult") return "warning";
//   // parse the state out of body
//   switch (message.result.status) {
//     case "failure":
//       return "error";
//     case "success":
//       return "success";
//     default:
//       return "warning";
//   }
// }

export default function ActionResultMessage({ message }: Props) {
  return (
    <Box className={Styles.actionBox}>
      {/* <CircleIcon type={actionResultStatus(message)} /> */}
      <Text size="1">calling action {message.type}</Text>
    </Box>
  );
}
