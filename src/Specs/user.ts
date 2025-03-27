export interface Profile {
  id: string;
  username: string;
  role: number;
  status: number;
  credit: number;
  balance: number;
  registered_at: string;
  updated_at: string;
}

export interface AuthResponse {
  data: Profile;
  access_token: string;
  refresh_token: string;
}
