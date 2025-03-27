import { Theme } from "@specs/theme";
import { store, themeModeAtom } from "./store";

export function changeTheme() {
  const theme = store.get(themeModeAtom);
  switch (theme) {
    case "light":
      setTheme("dark");
      break;
    case "dark":
      setTheme("light");
      break;
  }
}

function setTheme(theme: Theme) {
  store.set(themeModeAtom, theme);
  localStorage.setItem("theme", theme);
}

export function getDefaultTheme(): Theme {
  const value = localStorage.getItem("theme");
  if (value) {
    return value as Theme;
  }
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDarkMode) {
    return "dark";
  } else {
    return "light";
  }
}
