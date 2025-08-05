import { Text } from "@radix-ui/themes";
import { ILocalMessage } from "@specs/threads";
import Markdown from "@components/Markdown/Markdown";

interface Props {
  message: ILocalMessage;
}

export default function PlainMessage({ message }: Props) {
  return (
    <Text size="2">
      <Markdown content={message.body} />
    </Text>
  );
}
