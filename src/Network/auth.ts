import { AuthResponse, Profile } from "@specs/user";
import Nexus from "./Instances/Nexus";
import { transformHttpResponse, updateTokens } from "./configs";
import { Axios } from "axios";

export interface LoginParams {
  username: string;
  password: string;
}
export async function login(nexus: Nexus, params: LoginParams) {
  const response = await transformHttpResponse(() =>
    nexus.httpClient.post<AuthResponse>("/auth/login", params)
  );
  if (response.code !== 200) {
    return response;
  }
  updateTokens(response.data, nexus);
  return response;
}

export interface RegisterParams {
  invitation_code: string;
  username: string;
  password: string;
}

export async function register(nexus: Nexus, params: RegisterParams) {
  const response = await transformHttpResponse(() =>
    nexus.httpClient.post<AuthResponse>("/auth/register", params)
  );
  if (response.code !== 200) {
    return response;
  }
  updateTokens(response.data, nexus);
  return response;
}

export async function getProfile(nexus: Nexus) {
  const response = await transformHttpResponse(() => nexus.httpClient.get<Profile>("/auth/profile"));
  if (response.code !== 200) {
    return response;
  }
  nexus.profile.next(response.data);
  return response;
}

interface EntityTokenResponse {
  access_token: string;
  refresh_token: string;
}
export async function getEntityTokens(httpClient: Axios, entity: string) {
  return transformHttpResponse(() => httpClient.post<EntityTokenResponse>("/auth/entity-token", { entity }));
}
