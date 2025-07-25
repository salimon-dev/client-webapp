import { CSSProperties } from "react";

interface Props {
  style?: CSSProperties;
}
export default function ErrorIcon({ style }: Props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ ...style }}>
      <circle cx="32" cy="32" r="30" style={{ stroke: "var(--color-danger)" }} strokeWidth="4" />
      <line
        x1="32"
        y1="18"
        x2="32"
        y2="38"
        style={{ stroke: "var(--color-danger)" }}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="46" r="3" style={{ fill: "var(--color-danger)" }} />
    </svg>
  );
}
