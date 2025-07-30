import { CSSProperties } from "react";

interface Props {
  style?: CSSProperties;
}

export default function CopyIcon({ style }: Props) {
  return (
    <svg
      style={{ ...style, fill: "var(--accent-12)" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v16h13a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
    </svg>
  );
}
