import { profileAtom } from "@providers/auth";
import { store } from "@providers/store";
import { IThread } from "@specs/threads";

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

export function amountToString(amount: number) {
  if (amount < 1000) {
    return `${amount}`;
  }
  if (amount < 1000000) {
    return `${(amount / 1000).toFixed(2)}K`;
  }
  if (amount < 1000000000) {
    return `${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount < 1000000000000) {
    return `${(amount / 1000000000).toFixed(2)}B`;
  }
  if (amount < 1000000000000000) {
    return `${(amount / 1000000000000).toFixed(2)}T`;
  }
}
export function formatWithCommas(amount: number) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function transactionStatusToString(status: number) {
  switch (status) {
    case 1:
      return "pending request";
    case 2:
      return "completed";
    case 3:
      return "rejected";
    default:
      return "N.D";
  }
}

export function getThreadName(thread: IThread): string {
  if (thread.name !== "{NAME}") {
    return thread.name;
  }
  const profile = store.get(profileAtom);

  const usernames = thread.members
    .filter((item) => {
      if (!profile) return true;
      return item.id != profile.id;
    })
    .map((item) => item.username)
    .join(", ");
  return usernames;
}
