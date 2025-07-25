import LoadingIcon from "@icons/LoadingIcon";
import Styles from "./styles.module.css";
import { Text } from "@radix-ui/themes";
interface Props {
  message?: string;
}
export default function LoadingView({ message = "loading transactions..." }: Props) {
  return (
    <div className={Styles.container}>
      <div className={Styles.icon}>
        <LoadingIcon />
      </div>
      <div className={Styles.message}>
        <Text>{message}</Text>
      </div>
    </div>
  );
}
