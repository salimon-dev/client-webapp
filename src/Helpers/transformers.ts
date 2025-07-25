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
