import Nexus from "@nexus/Nexus";
import { Theme } from "@specs/theme";
import { atom, createStore } from "jotai";

export const store = createStore();
// core states
export const nexusAtom = atom<Nexus>(new Nexus());
// theme
export const themeModeAtom = atom<Theme>("inherit");
