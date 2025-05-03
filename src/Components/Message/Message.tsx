import { MessageRecord } from "@network/specs";
import PlainMessage from "./PlainMessage";
import ActionResultMessage from "./ActionResultMessage";
import ActionMessage from "./ActionMessage";

interface Props {
  message: MessageRecord;
}

export default function Message({ message }: Props) {
  if (message.type === "plain") return <PlainMessage message={message} />;
  if (message.type === "actionResult") return <ActionResultMessage message={message} />;
  return <ActionMessage message={message} />;
}
