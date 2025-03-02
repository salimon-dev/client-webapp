import Nexus from "@nexus/Nexus";
import { ConnectionEvent } from "@specs/events";
import { Theme } from "@specs/theme";
import { IProfile } from "@specs/user";
import { atom, createStore } from "jotai";
import { Subject } from "rxjs";

export const store = createStore();

export const nexusAtom = atom<Nexus>(new Nexus());
// setup states
export const tokenStateAtom = atom<"init" | "in_progress" | "done">("init");
export const socketConnectionStateAtom = atom<"init" | "in_progress" | "done">("init");
export const socketAuthStateAtom = atom<"init" | "in_progress" | "done">("init");

// authentication
export const accessTokenAtom = atom<string>();
export const refreshTokenAtom = atom<string>();
export const profileAtom = atom<IProfile>();

// connection

export const connectionPhaseAtom = atom<
  | "init"
  | "loading_config"
  | "validating_tokens"
  | "socket_connecting"
  | "authenticating"
  | "entity_connecting"
  | "connected"
>("init");
export const socketAtom = atom<WebSocket>();
export const socketEvents = new Subject<ConnectionEvent>();
export const connectedEntityAtom = atom<string>();

// theme
export const themeModeAtom = atom<Theme>("inherit");
