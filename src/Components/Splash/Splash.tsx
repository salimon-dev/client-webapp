import LoadingIcon from "@icons/LoadingIcon";
import Styles from "./styles.module.css";

interface IProps {
  status?: string;
}

export default function Splash({ status = "connecting" }: IProps) {
  return (
    <div className={Styles.container}>
      <LoadingIcon />
      <span>{status}</span>
    </div>
  );
}
