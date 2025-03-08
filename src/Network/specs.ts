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

export interface ICollection<T> {
  data: T[];
  page: number;
  page_size: number;
  total: number;
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
export type HttpResponse<T> =
  | HttpSuccess<T>
  | HttpValidationError
  | HttpUnauthorizedError
  | HttpPermissionDeniedError
  | HttpUnknownError;

export type HttpSuccess<T> = {
  code: 200;
  data: T;
};
export type HttpValidationError = {
  code: 400;
  errors: { [key: string]: string };
};
export type HttpUnauthorizedError = {
  code: 401;
};
export type HttpPermissionDeniedError = {
  code: 403;
};
export type HttpUnknownError = {
  code: 0;
};

export interface IEntityProfile {
  name: string;
  description: string;
  base_url: string;
  tags: string[];
}
