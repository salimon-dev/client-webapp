import { httpClient } from "@providers/http";
import { IAuthResponse } from "@specs/auth";
import { IProfile } from "@specs/users";

interface ILoginParams {
  username: string;
  password: string;
}
export async function login(params: ILoginParams) {
  return await httpClient.post<IAuthResponse>("/auth/login", params).then((response) => response.data);
}

interface IRegisterParams extends ILoginParams {
  invitation_code: string;
}
export async function register(params: IRegisterParams) {
  return await httpClient.post("/auth/register", params).then((response) => response.data);
}

export async function rotate(token: string) {
  return httpClient.post<IAuthResponse>("/auth/rotate", { token }).then((response) => response.data);
}

interface IProfileResponse {
  user: IProfile;
  // TODO: permission schema is in this object too. can be useful in future
}
export async function getProfile() {
  return httpClient.get<IProfileResponse>("/auth/profile").then((response) => response.data);
}
