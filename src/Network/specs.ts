export interface Profile {
  id: string;
  username: string;
  role: number;
  status: number;
  credit: number;
  balance: number;
  registered_at: string;
  updated_at: string;
}

export interface Collection<T> {
  data: T[];
  page: number;
  page_size: number;
  total: number;
}

export interface AuthResponse {
  data: Profile;
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

export interface EntityProfile {
  name: string;
  description: string;
  base_url: string;
  tags: string[];
}

export type MessageType = "plain";

export interface MessageRecord {
  id: string;
  from: string;
  body: string;
  type: MessageType;
  sentAt: number;
}
export interface MessageRecordParam {
  from: string;
  type: MessageType;
  body: string;
}

export interface InteractParams {
  body: string;
}

export interface InteractResponse {
  from: string;
  body: string;
  type: MessageType;
}
