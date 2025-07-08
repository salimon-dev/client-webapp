import { WebSocketEvent } from "@specs/websocket";
import { wsBaseUrlAtom } from "./configs";
import { store } from "./store";
import { filter, Subject } from "rxjs";
import { accessTokenAtom } from "./auth";

export let wsConnection: WebSocket | undefined = undefined;
export const wsEvents = new Subject<WebSocketEvent>();

export async function setupWebsocketConnection() {
  const url = store.get(wsBaseUrlAtom);
  if (!url) return;
  if (wsConnection) {
    wsConnection.close();
  }
  return new Promise<void>((resolve) => {
    wsConnection = new WebSocket(url);
    wsConnection.onopen = () => {
      resolve();
      console.log("websocket connected");
    };
    wsConnection.onerror = (e) => console.error(e);
    wsConnection.onclose = () => console.log("websocket disconnected");
    wsConnection.onmessage = (payload) => {
      const data = payload.data as WebSocketEvent;
      wsEvents.next(data);
    };
  });
}

export async function setupWebsocketAuthentication() {
  const accessToken = store.get(accessTokenAtom);
  if (!wsConnection) return false;
  if (!accessToken) return false;
  const result = new Promise<boolean>((resolve) => {
    wsEvents.pipe(filter((event) => event.action === "AUTH")).subscribe((event) => {
      resolve(event.result);
    });
  });
  wsConnection.send(JSON.stringify({ action: "AUTH", access_token: accessToken }));
  return result;
}
