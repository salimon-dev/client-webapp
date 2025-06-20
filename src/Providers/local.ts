import { IThread } from "@specs/threads";
import { atom } from "jotai";

export const threadSearchQueryAtom = atom<string>();
export const threads = atom<IThread[]>();
