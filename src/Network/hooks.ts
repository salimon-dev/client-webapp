import { nexus } from "@providers/store";
import { useEffect, useState } from "react";
import { IProfile } from "./specs";

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string>();
  useEffect(() => {
    const sub = nexus.accessToken.subscribe(setAccessToken);
    return () => {
      sub.unsubscribe();
    };
  }, []);
  return accessToken;
}

export function useRefreshToken() {
  const [refreshToken, setRefreshToken] = useState<string>();
  useEffect(() => {
    const sub = nexus.refreshToken.subscribe(setRefreshToken);
    return () => {
      sub.unsubscribe();
    };
  }, []);
  return refreshToken;
}

export function useProfile() {
  const [profile, setProfile] = useState<IProfile>();
  useEffect(() => {
    const sub = nexus.profile.subscribe(setProfile);
    return () => {
      sub.unsubscribe();
    };
  }, []);
  return profile;
}

export function useIsLoggedInToNexus() {
  const accessToken = useAccessToken();
  return !!accessToken;
}

export function useIsConnectedToNexus() {
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    const sub = nexus.isReady.subscribe(setIsReady);
    return () => {
      sub.unsubscribe();
    };
  }, []);
  return isReady;
}
