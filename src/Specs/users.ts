export interface IUser {
  id: string;
  registered_at: number;
  updated_at: number;
  username: string;
  base_url: string;
}

export interface IProfile extends IUser {
  credit: number;
  score: number;
  status: number;
  is_public: boolean;
}
