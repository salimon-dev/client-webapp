interface Props {
  style?: React.CSSProperties;
}
export default function PaymentIcon({ style }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="2"
      style={{ stroke: "var(--accent-12)", ...style }}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
      <path d="M3 10h18" />
      <path d="M7 15h2M11 15h6" strokeLinecap="round" />
    </svg>
  );
}
