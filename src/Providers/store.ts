import Nexus from "@network/Instances/Nexus";
import { Theme } from "@specs/theme";
import { atom, createStore } from "jotai";
import { getDefaultTheme } from "./theme";

export const store = createStore();
// core states
export const nexus = new Nexus();
// theme
export const themeModeAtom = atom<Theme>(getDefaultTheme());
