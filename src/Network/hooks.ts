import { nexus } from "@providers/store";
import { useEffect, useState } from "react";
import { MessageRecord, Profile } from "./specs";
import Entity from "./Instances/Entity";

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
  const [profile, setProfile] = useState<Profile>();
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

export function useMessages() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  useEffect(() => {
    const sub = nexus.db.messages.subscribe(setMessages);
    return () => {
      sub.unsubscribe();
    };
  }, []);
  return messages;
}

export function useInteractionState() {
  const [entity, setEntity] = useState<Entity>();
  useEffect(() => {
    const sub = nexus.activeEntity.subscribe(setEntity);
    return () => {
      sub.unsubscribe();
    };
  }, []);
  return entity;
}
