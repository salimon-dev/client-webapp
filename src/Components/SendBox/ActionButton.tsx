import Styles from "./styles.module.css";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
  onClick?: () => void;
}

export default function ActionButton({ children, onClick }: Props) {
  return (
    <div className={Styles.actionButton} onClick={onClick}>
      {children}
    </div>
  );
}
