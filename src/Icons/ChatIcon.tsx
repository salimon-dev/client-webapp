interface Props {
  style?: React.CSSProperties;
}
export default function ChatIcon({ style }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="2"
      style={{ stroke: "var(--accent-12)", ...style }}
    >
      <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H12l-3 3v-3H6a2 2 0 0 1-2-2V5z" />
      <path d="M8 8h8M8 12h5" strokeLinecap="round" />
    </svg>
  );
}
