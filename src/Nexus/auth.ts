import { IAuthResponse, IProfile } from "@specs/user";
import Nexus from "./Nexus";
import { transformHttpResponse, updateTokens } from "./configs";

export interface ILoginParams {
  username: string;
  password: string;
}
export async function login(nexus: Nexus, params: ILoginParams) {
  const response = await transformHttpResponse(() =>
    nexus.httpClient.post<IAuthResponse>("/auth/login", params)
  );
  if (response.code !== 200) {
    return response;
  }
  updateTokens(response.data, nexus);
  return response;
}

export interface IRegisterParams {
  invitation_code: string;
  username: string;
  password: string;
}

export async function register(nexus: Nexus, params: IRegisterParams) {
  const response = await transformHttpResponse(() =>
    nexus.httpClient.post<IAuthResponse>("/auth/register", params)
  );
  if (response.code !== 200) {
    return response;
  }
  updateTokens(response.data, nexus);
  return response;
}

export async function getProfile(nexus: Nexus) {
  const response = await transformHttpResponse(() => nexus.httpClient.get<IProfile>("/auth/profile"));
  if (response.code !== 200) {
    return response;
  }
  nexus.profile.next(response.data);
  return response;
}
