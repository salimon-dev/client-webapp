import { atom } from "jotai";
import { store } from "./store";

export const sideOpenAtom = atom(true);
export const sendBoxHeightAtom = atom(46);
export function toggleSide() {
  store.set(sideOpenAtom, (prev) => !prev);
}

export function updateSendBoxHeight(height: number) {
  store.set(sendBoxHeightAtom, height);
}
