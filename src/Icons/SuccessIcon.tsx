import { CSSProperties } from "react";

interface Props {
  style?: CSSProperties;
}
export default function SuccessIcon({ style }: Props) {
  return (
    <svg style={style} viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" style={{ stroke: "var(--color-success)" }} strokeWidth="4" />
      <path
        d="M20 34L28 42L44 26"
        style={{ stroke: "var(--color-success)" }}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
