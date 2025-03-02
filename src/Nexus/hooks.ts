import { nexusAtom } from "@providers/store";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { IProfile } from "./specs";

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string>();
  const nexus = useAtomValue(nexusAtom);
  useEffect(() => {
    const sub = nexus.accessToken.subscribe(setAccessToken);
    return () => {
      sub.unsubscribe();
    };
  }, [nexus]);
  return accessToken;
}

export function useRefreshToken() {
  const [refreshToken, setRefreshToken] = useState<string>();
  const nexus = useAtomValue(nexusAtom);
  useEffect(() => {
    const sub = nexus.refreshToken.subscribe(setRefreshToken);
    return () => {
      sub.unsubscribe();
    };
  }, [nexus]);
  return refreshToken;
}

export function useProfile() {
  const [profile, setProfile] = useState<IProfile>();
  const nexus = useAtomValue(nexusAtom);
  useEffect(() => {
    const sub = nexus.profile.subscribe(setProfile);
    return () => {
      sub.unsubscribe();
    };
  }, [nexus]);
  return profile;
}

export function useIsLoggedInToNexus() {
  const accessToken = useAccessToken();
  return !!accessToken;
}

export function useIsConnectedToNexus() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const nexus = useAtomValue(nexusAtom);
  useEffect(() => {
    const sub = nexus.isReady.subscribe(setIsReady);
    return () => {
      sub.unsubscribe();
    };
  }, [nexus]);
  return isReady;
}
