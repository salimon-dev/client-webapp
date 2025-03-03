import { store, themeModeAtom } from "./store";

export function changeTheme() {
  const theme = store.get(themeModeAtom);
  switch (theme) {
    case "inherit":
    case "light":
      store.set(themeModeAtom, "dark");
      break;
    case "dark":
      store.set(themeModeAtom, "light");
      break;
  }
}
