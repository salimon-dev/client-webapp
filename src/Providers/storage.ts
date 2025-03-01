import { baseURL } from "@rest/common";
import { IAuthResponse } from "@specs/user";
import axios from "axios";
import { accessTokenAtom, profileAtom, refreshTokenAtom, store, themeModeAtom } from "./store";
import { Theme } from "@specs/theme";

// storage apis
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

function setupTheme() {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "inherit");
    store.set(themeModeAtom, "inherit");
  } else {
    localStorage.setItem("theme", theme);
    store.set(themeModeAtom, theme as Theme);
  }
}

export async function setupStorage(): Promise<boolean> {
  setupTheme();
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

export function toggleThemeWithStorage() {
  const theme = store.get(themeModeAtom);
  switch (theme) {
    case "dark":
      store.set(themeModeAtom, "light");
      localStorage.setItem("theme", "light");
      break;
    case "light":
    case "inherit":
      store.set(themeModeAtom, "dark");
      localStorage.setItem("theme", "dark");
      break;
  }
}
