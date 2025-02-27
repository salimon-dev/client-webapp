export interface IProfile {
  id: string;
  username: string;
  role: number;
  status: number;
  credit: number;
  balance: number;
  registered_at: string;
  updated_at: string;
}

export interface IAuthResponse {
  data: IProfile;
  access_token: string;
  refresh_token: string;
}
