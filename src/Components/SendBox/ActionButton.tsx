import Styles from "./styles.module.css";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ActionButton({ children, onClick, disabled }: Props) {
  const classes = [Styles.actionButton];
  if (disabled) {
    classes.push(Styles.actionButtonDisabled);
  }
  return (
    <div className={classes.join(" ")} onClick={onClick}>
      {children}
    </div>
  );
}
