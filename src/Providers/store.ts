import { baseURL } from "@rest/common";
import { Theme } from "@specs/theme";
import { IAuthResponse, IProfile } from "@specs/user";
import axios from "axios";
import { atom, createStore } from "jotai";

export const store = createStore();

// authentication
export const accessTokenAtom = atom<string>();
export const refreshTokenAtom = atom<string>();
export const profileAtom = atom<IProfile>();

// theme
export const themeModeAtom = atom<Theme>("inherit");

// storage apis
export function loadStorage() {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const profileStr = localStorage.getItem("profile");
  const theme = localStorage.getItem("theme");
  if (!accessToken) return;
  if (!refreshToken) return;
  if (!profileStr) return;
  if (!theme) return;
  store.set(accessTokenAtom, accessToken);
  store.set(refreshTokenAtom, refreshToken);
  store.set(profileAtom, JSON.parse(profileStr));
  store.set(themeModeAtom, theme as Theme);
}

export function setStorage(data: IAuthResponse) {
  store.set(accessTokenAtom, data.access_token);
  store.set(refreshTokenAtom, data.refresh_token);
  store.set(profileAtom, data.data);
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("profile", JSON.stringify(data.data));
}

export function getStorage(): IAuthResponse | undefined {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const profile = localStorage.getItem("profile");
  if (!access_token || !refresh_token || !profile) {
    return undefined;
  } else {
    return {
      access_token,
      refresh_token,
      data: JSON.parse(profile),
    };
  }
}

export async function setupStorage(): Promise<boolean> {
  const storage = getStorage();
  if (!storage) return false;
  try {
    const response = await axios.get("/profile", {
      baseURL,
      headers: { Authorization: "Bearer " + storage.access_token },
    });
    storage.data = response.data;
    setStorage(storage);
    return true;
  } catch {
    try {
      const response = await axios.post<IAuthResponse>(
        "/auth/rotate",
        { token: storage.refresh_token },
        { baseURL }
      );
      setStorage(response.data);
      return true;
    } catch {
      return false;
    }
  }
}
