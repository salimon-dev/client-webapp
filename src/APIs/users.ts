import { httpClient } from "@providers/http";
import { ICollection, ISearchParams } from "./common";
import { IUser } from "@specs/users";

interface ISearchUsersParams extends ISearchParams {
  username?: string;
}
export async function searchUsers(params: ISearchUsersParams) {
  return httpClient.get<ICollection<IUser>>("/member/users", { params }).then((response) => response.data);
}
