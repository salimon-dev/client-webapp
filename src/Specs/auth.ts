import { IProfile } from "./users";

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  profile: IProfile;
}
