import axios from "axios";
import { store } from "./store";
import { atom } from "jotai";
import { IProfile } from "@specs/users";
import { IAuthResponse } from "@specs/auth";
import { setupHttpClient } from "./http";
import { baseUrlAtom, loadConfigs } from "./configs";

export const bootstrapStateAtom = atom<"init" | "loading" | "done">("init");
export const accessTokenAtom = atom<string>();
export const refreshTokenAtom = atom<string>();
export const profileAtom = atom<IProfile>();

export function storeAuthResponse(response: IAuthResponse, inLocalStorage = true) {
  store.set(accessTokenAtom, response.access_token);
  store.set(refreshTokenAtom, response.refresh_token);
  store.set(profileAtom, response.profile);

  if (inLocalStorage) {
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);
    localStorage.setItem("profile", JSON.stringify(response.profile));
  }
}

export function loadAuthFromLocalStorage(): IAuthResponse | undefined {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const profile = localStorage.getItem("profile");

  if (access_token && refresh_token && profile) {
    return {
      access_token,
      refresh_token,
      profile: JSON.parse(profile),
    };
  } else {
    return undefined;
  }
}

export async function validateAuthResponse(data: IAuthResponse, baseURL: string): Promise<boolean> {
  try {
    await axios
      .get("/auth/profile", {
        headers: { Authorization: "Bearer " + data.access_token },
        baseURL,
      })
      .then((response) => response.data);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * loads auth tokens from local storage and validates them against the server.
 */
export async function loadAndValidateAuth() {
  store.set(bootstrapStateAtom, "loading");
  await loadConfigs();
  const baseURL = store.get(baseUrlAtom)!;
  setupHttpClient(baseURL);
  const authData = loadAuthFromLocalStorage();
  if (!authData) {
    store.set(bootstrapStateAtom, "done");
    return;
  }
  const result = await validateAuthResponse(authData, baseURL);
  if (!result) {
    clearAuth();
    store.set(bootstrapStateAtom, "done");
    return;
  }
  storeAuthResponse(authData);
  setupHttpClient(baseURL);
  store.set(bootstrapStateAtom, "done");
}

export function clearAuth() {
  store.set(accessTokenAtom, undefined);
  store.set(refreshTokenAtom, undefined);
  store.set(profileAtom, undefined);
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("profile");
  localStorage.removeItem("permissions");
}

export function useProfile() {
  return store.get(profileAtom);
}
