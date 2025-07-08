import { atom } from "jotai";
import { store } from "./store";

export const apiBaseUrlAtom = atom<string>();
export const wsBaseUrlAtom = atom<string>();

export async function loadConfigs() {
  store.set(apiBaseUrlAtom, import.meta.env["VITE_NEXUS_BASE_API_URL"]);
  store.set(wsBaseUrlAtom, import.meta.env["VITE_NEXUS_BASE_WS_URL"]);
}
