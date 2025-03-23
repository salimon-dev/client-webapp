interface Props {
  type: "success" | "error" | "info";
}
export default function CircleIcon({ type }: Props) {
  function fill() {
    switch (type) {
      case "info":
        return "var(--color-info)";
      case "error":
        return "var(--color-danger)";
      case "success":
        return "var(--color-success)";
    }
  }
  return (
    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" />
      <path
        style={{ fill: fill() }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
        fill="#323232"
      />
    </svg>
  );
}
