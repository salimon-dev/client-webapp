import { IAuthResponse } from "@specs/user";
import { accessTokenAtom, profileAtom, refreshTokenAtom, store, themeModeAtom } from "./store";

// storage apis
export function setAuthStorage(data: IAuthResponse) {
  store.set(accessTokenAtom, data.access_token);
  store.set(refreshTokenAtom, data.refresh_token);
  store.set(profileAtom, data.data);
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("profile", JSON.stringify(data.data));
}

export function clearAuthStorage() {
  store.set(accessTokenAtom, undefined);
  store.set(refreshTokenAtom, undefined);
  store.set(profileAtom, undefined);
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("profile");
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
