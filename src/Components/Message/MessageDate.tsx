import { Box } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { ILocalMessage } from "@specs/threads";
import { tsToDateString } from "@helpers/time";
import LoadingIcon from "@icons/LoadingIcon";

interface Props {
  message: ILocalMessage;
}
export default function MessageDate({ message }: Props) {
  switch (message.sendStatus) {
    case "done":
      return <Box className={Styles.messageDate}>{tsToDateString(message.updated_at)}</Box>;
    case "pending":
      return (
        <Box className={Styles.messageDate}>
          <LoadingIcon />
        </Box>
      );
    case "failed":
      return <Box className={Styles.messageDate}>failed</Box>;
  }
}
