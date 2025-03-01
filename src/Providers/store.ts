import { Theme } from "@specs/theme";
import { IProfile } from "@specs/user";
import { atom, createStore } from "jotai";

export const store = createStore();

// authentication
export const accessTokenAtom = atom<string>();
export const refreshTokenAtom = atom<string>();
export const profileAtom = atom<IProfile>();

// theme
export const themeModeAtom = atom<Theme>("inherit");
