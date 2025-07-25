export interface IUser {
  id: string;
  registered_at: number;
  updated_at: number;
  username: string;
  description: string;
}

export interface IProfile extends IUser {
  credit: number;
  score: number;
  status: number;
  visibility: number;
}

export const userVisibilities = [
  { value: 1, label: "Public" },
  { value: 2, label: "Invites only" },
  { value: 3, label: "Invites only" },
  { value: 4, label: "Private" },
];

export function userVisiblityStr(value: number) {
  const record = userVisibilities.find((item) => item.value === value);
  if (!record) return "N.A";
  return record.label;
}
