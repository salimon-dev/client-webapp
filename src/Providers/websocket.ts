import { WebSocketEvent } from "@specs/websocket";
import { wsBaseUrlAtom } from "./configs";
import { store } from "./store";
import { first, Subject } from "rxjs";
import { accessTokenAtom } from "./auth";
import { atom } from "jotai";

export let wsConnection: WebSocket | undefined = undefined;
export const wsEvents = new Subject<WebSocketEvent>();
export const wsStateAtom = atom<"init" | "connected" | "disconnected" | "authenticated">("init");

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
      store.set(wsStateAtom, "connected");
      console.log("websocket connected");
    };
    wsConnection.onerror = (e) => console.error(e);
    wsConnection.onclose = () => {
      store.set(wsStateAtom, "disconnected");
      console.log("websocket disconnected");
    };
    wsConnection.onmessage = (payload) => {
      const data = JSON.parse(payload.data) as WebSocketEvent;
      wsEvents.next(data);
    };
  });
}

export async function setupWebsocketAuthentication() {
  const accessToken = store.get(accessTokenAtom);
  if (!wsConnection) return false;
  if (!accessToken) return false;
  const result = new Promise<boolean>((resolve) => {
    wsEvents
      .pipe(
        // filter(({ action }) => action === "AUTH"),
        first((event) => event.action === "AUTH")
      )
      .subscribe((event) => {
        resolve(event.result);
        if (event.result) {
          store.set(wsStateAtom, "authenticated");
        }
      });
  });
  wsConnection.send(JSON.stringify({ action: "AUTH", access_token: accessToken }));
  return result;
}
