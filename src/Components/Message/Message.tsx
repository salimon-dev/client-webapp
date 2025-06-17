import PlainMessage from "./PlainMessage";
import ActionMessage from "./ActionMessage";
import { IMessage, MESSAGE_TYPE_PLAIN } from "@specs/threads";

interface Props {
  message: IMessage;
}

export default function Message({ message }: Props) {
  if (message.type === MESSAGE_TYPE_PLAIN) return <PlainMessage message={message} />;
  // if (message.type === "actionResult") return <ActionResultMessage message={message} />;
  return <ActionMessage message={message} />;
}
