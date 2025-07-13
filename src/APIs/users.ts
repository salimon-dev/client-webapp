import { httpClient } from "@providers/http";
import { ICollection, ISearchParams } from "./common";
import { IUser } from "@specs/users";
import { AxiosError } from "axios";

interface ISearchUsersParams extends ISearchParams {
  username?: string;
}
export async function searchUsers(params: ISearchUsersParams) {
  return httpClient.get<ICollection<IUser>>("/member/users", { params }).then((response) => response.data);
}

export async function searchUserByUsername(username: string) {
  return httpClient
    .get<IUser | undefined>(`/member/users/username/${username}`)
    .then((response) => response.data)
    .catch((err) => {
      const error = err as AxiosError;
      if (error.response && error.response.status === 404) {
        return undefined;
      } else {
        throw error;
      }
    });
}
