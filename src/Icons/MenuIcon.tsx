import { CSSProperties } from "react";

interface Props {
  style?: CSSProperties;
}

export default function MenuIcon({ style }: Props) {
  return (
    <svg
      style={{ stroke: "var(--accent-12)", ...style }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 6H20M4 12H20M4 18H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
