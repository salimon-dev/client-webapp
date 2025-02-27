import { useAtomValue } from "jotai";
import { accessTokenAtom } from "./store";

export function useIsLoggedIn() {
  const accessToken = useAtomValue(accessTokenAtom);
  return !!accessToken;
}
