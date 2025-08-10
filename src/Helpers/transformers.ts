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
  return getChatThreadName(thread);
}

// right now each thread has only two members so we can just filter out the current user and display other name.
function getChatThreadName(thread: IThread): string {
  const profile = store.get(profileAtom);
  if (!profile) return thread.name;
  const member = thread.members.find((item) => item.id !== profile!.id);
  if (!member) {
    return thread.name;
  }
  return member.username;
}
