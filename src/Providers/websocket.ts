import { AuthEvent, MessageEvent, ThreadEvent, WebSocketEvent } from "@specs/websocket";
import { wsBaseUrlAtom } from "./configs";
import { store } from "./store";
import { Subject } from "rxjs";
import { accessTokenAtom, profileAtom } from "./auth";
import { atom } from "jotai";
import { appendRemoteMessage, deleteLocalThread, putThread } from "./local";

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
    wsEvents.subscribe((event) => {
      switch (event.action) {
        case "AUTH":
          return handleAuthEvent(event);
        case "MESSAGE":
          return handleMessageEvent(event);
        case "THREAD":
          return handleThreadEvent(event);
      }
    });
  });
}

export async function setupWebsocketAuthentication() {
  const accessToken = store.get(accessTokenAtom);
  if (!wsConnection) return false;
  if (!accessToken) return false;
  wsConnection.send(JSON.stringify({ action: "AUTH", access_token: accessToken }));
}

function handleAuthEvent(event: AuthEvent): void {
  if (event.result) {
    store.set(wsStateAtom, "authenticated");
  } else {
    store.set(wsStateAtom, "connected");
  }
}

function handleMessageEvent(event: MessageEvent): void {
  const message = event.message;
  const profile = store.get(profileAtom);
  // client is the origin of this message
  if (message.user_id === profile!.id) {
    return;
  }
  appendRemoteMessage(message);
}

function handleThreadEvent(event: ThreadEvent): void {
  switch (event.type) {
    case "CREATE":
    case "UPDATE":
      putThread(event.thread);
      break;
    case "DELETE":
      deleteLocalThread(event.thread);
  }
}
