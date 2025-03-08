import Nexus from "@network/Nexus";
import { Theme } from "@specs/theme";
import { atom, createStore } from "jotai";

export const store = createStore();
// core states
export const nexus = new Nexus();
// theme
export const themeModeAtom = atom<Theme>("inherit");
