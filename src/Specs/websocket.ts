import { IMessage } from "./threads";

export type AuthEvent = {
  action: "AUTH";
  result: boolean;
};

export type MessageEvent = {
  action: "MESSAGE";
  data: IMessage;
};

export type WebSocketEvent = AuthEvent | MessageEvent;
