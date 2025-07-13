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
