export type AuthEvent = { action: "AUTH"; result: boolean };
export type MessageEvent = { action: "MESSAGE"; body: string };
export type TokenEvent = { action: "TOKEN"; token: string };
export type ConnectEvent = { action: "CONNECT"; result: boolean };

export type ConnectionEvent = AuthEvent | MessageEvent | TokenEvent | ConnectEvent;
