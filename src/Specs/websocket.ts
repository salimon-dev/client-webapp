import { IMessage, IThread } from "./threads";

export type AuthEvent = {
  action: "AUTH";
  result: boolean;
};

export type MessageEvent = {
  action: "MESSAGE";
  message: IMessage;
};

export type ThreadEvent = {
  action: "THREAD";
  thread: IThread;
  type: "CREATE" | "UPDATE" | "DELETE";
};

export type WebSocketEvent = AuthEvent | MessageEvent | ThreadEvent;
