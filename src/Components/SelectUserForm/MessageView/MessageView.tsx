import { Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
interface IProps {
  message: string;
}
export default function MessageView({ message }: IProps) {
  return (
    <div className={Styles.container}>
      <Text size="2">{message}</Text>
    </div>
  );
}
