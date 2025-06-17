export function userStatusToString(status: number) {
  switch (status) {
    case 1:
      return "active";
    case 2:
      return "inactive";
    default:
      return "N.D";
  }
}
