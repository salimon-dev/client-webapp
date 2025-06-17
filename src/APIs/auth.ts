import { httpClient } from "@providers/http";
import { IAuthResponse } from "@specs/auth";

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
