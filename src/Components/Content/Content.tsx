import { Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import Message from "@components/Message/Message";
import { IMessage } from "@specs/image";
import moment from "moment";

export default function Content() {
  const dummyMessage: IMessage = {
    from: "entity",
    body: "Proident cillum cillum sit esse mollit velit adipisicing et. Ad ea fugiat incididunt adipisicing amet ad occaecat non. Labore nulla magna et sunt officia. Est ea tempor magna occaecat Lorem anim excepteur deserunt magna magna fugiat. Occaecat proident aute pariatur et aute consequat do consectetur.",
    type: "plain",
    id: 1,
    sentAt: moment().subtract(4, "hour").toDate(),
  };
  return (
    <Flex direction="column-reverse" className={Styles.content} gap="3">
      <Message message={dummyMessage} />
      <Message message={dummyMessage} />
    </Flex>
  );
}
