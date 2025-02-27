import { CSSProperties, ReactNode } from "react";
import Styles from "./styles.module.css";

interface IProps {
  label?: string;
  icon?: ReactNode;
  type?: "primary" | "secondary";
  onClick?: () => void;
  loading?: boolean;
  style?: CSSProperties;
  size?: "small" | "medium" | "large";
}
export default function Button({
  label,
  icon,
  type = "primary",
  onClick,
  loading,
  style,
  size = "medium",
}: IProps) {
  const classses = [Styles.btn];
  switch (type) {
    case "primary":
      classses.push(Styles.primary);
      break;
    case "secondary":
      classses.push(Styles.secondary);
      break;
  }

  switch (size) {
    case "large":
      classses.push(Styles.large);
      break;
    case "medium":
      classses.push(Styles.medium);
      break;
    case "small":
      classses.push(Styles.small);
      break;
  }
  if (loading)
    return (
      <div style={style} className={classses.join(" ")}>
        ...
      </div>
    );
  return (
    <div className={classses.join(" ")} style={style} onClick={onClick}>
      {icon}
      <span style={{ marginLeft: icon ? 5 : 0 }}>{label}</span>
    </div>
  );
}
