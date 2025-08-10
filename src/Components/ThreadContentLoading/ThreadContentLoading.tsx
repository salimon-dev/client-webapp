import Styles from "./styles.module.css";
import { useAtomValue } from "jotai";
import { sendBoxHeightAtom } from "@providers/layout";
import LoadingIcon from "@icons/LoadingIcon";

interface IProps {
  message: string;
}
export default function ThreadContentLoading({ message }: IProps) {
  const sendBoxHeight = useAtomValue(sendBoxHeightAtom);

  return (
    <div className={Styles.container} style={{ maxHeight: `calc(100vh - ${sendBoxHeight}px)` }}>
      <div className={Styles.content}>
        <div className={Styles.loading}>
          <LoadingIcon />
        </div>
        <div className={Styles.message}>{message}</div>
      </div>
    </div>
  );
}
