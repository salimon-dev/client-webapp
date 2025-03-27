import LoadingIcon from "@icons/LoadingIcon";
import Styles from "./styles.module.css";

interface Props {
  status?: string;
}

export default function Splash({ status = "connecting" }: Props) {
  return (
    <div className={Styles.container}>
      <LoadingIcon />
      <span>{status}</span>
    </div>
  );
}
