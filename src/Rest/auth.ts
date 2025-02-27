import { AxiosResponse } from "axios";
import { httpClient } from "./common";
import { IAuthResponse, IProfile } from "@specs/user";

interface ILoginParams {
  username: string;
  password: string;
}
export async function login(params: ILoginParams): Promise<AxiosResponse<IAuthResponse>> {
  return httpClient().post<IAuthResponse>("/auth/login", params);
}

export async function getProfile(): Promise<AxiosResponse<IProfile>> {
  return httpClient().get<IProfile>("/profile");
}
