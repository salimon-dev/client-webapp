import { atom } from "jotai";
import { store } from "./store";

export const sideOpenAtom = atom(true);
export function toggleSide() {
  store.set(sideOpenAtom, (prev) => !prev);
}
