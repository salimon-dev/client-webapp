import { Configs } from "@specs/configs";
import axios from "axios";
import { atom } from "jotai";
import { store } from "./store";

export const baseUrlAtom = atom<string>();

export async function loadConfigs() {
  const configs = await axios.get<Configs>("/configs.json").then((response) => response.data);

  const env_base_url = import.meta.env["VITE_NEXUS_BASE_URL"] as string | undefined;
  if (env_base_url) {
    configs.nexus_base_url = env_base_url;
  }

  store.set(baseUrlAtom, configs.nexus_base_url);
}
