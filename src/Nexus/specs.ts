export interface IProfile {
  id: string;
  username: string;
  role: number;
  status: number;
  credit: number;
  balance: number;
  registered_at: string;
  updated_at: string;
}

export interface IAuthResponse {
  data: IProfile;
  access_token: string;
  refresh_token: string;
}

export function userRoleToString(value: number) {
  switch (value) {
    case 1:
      return "key maker";
    case 2:
      return "admin";
    case 3:
      return "developer";
    case 4:
      return "member";
    default:
      return "N.D";
  }
}

export function userStatusToString(value: number) {
  switch (value) {
    case 1:
      return "active";
    case 2:
      return "inactive";
    default:
      return "N.D";
  }
}

// http client
export type HttpResponse<T> = HttpSuccess<T> | HttpValidationError | HttpUnknownError;

export type HttpSuccess<T> = {
  code: 200;
  data: T;
};
export type HttpValidationError = {
  code: 400;
  errors: { [key: string]: string };
};
export type HttpUnknownError = {
  code: 0;
};
