import { IAuthResponse, IProfile } from "@specs/user";
import Nexus from "./Nexus";
import { updateTokens } from "./configs";

export interface ILoginParams {
  username: string;
  password: string;
}
export async function login(nexus: Nexus, params: ILoginParams) {
  const response = await nexus.httpClient.post<IAuthResponse>("/auth/login", params);
  if (response.status !== 200) {
    return response;
  }
  updateTokens(response.data, nexus);
}

export async function getProfile(nexus: Nexus) {
  const response = await nexus.httpClient.get<IProfile>("/profile");
  if (response.status !== 200) {
    return response;
  }
  nexus.profile.next(response.data);
}
