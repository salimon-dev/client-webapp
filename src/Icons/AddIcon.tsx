import { CSSProperties } from "react";

interface Props {
  style?: CSSProperties;
}

export default function AddIcon({ style }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ stroke: "var(--accent-12)", ...style }}
    >
      <g id="Complete">
        <g data-name="add" id="add-2">
          <g>
            <line
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="12"
              x2="12"
              y1="19"
              y2="5"
            />

            <line
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="5"
              x2="19"
              y1="12"
              y2="12"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
