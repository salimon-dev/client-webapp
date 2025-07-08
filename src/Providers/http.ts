import axios from "axios";
import { store } from "./store";
import { accessTokenAtom } from "./auth";
import { apiBaseUrlAtom } from "./configs";

export let httpClient = axios.create({});

export function setupHttpClient() {
  const baseURL = store.get(apiBaseUrlAtom);
  const accessToken = store.get(accessTokenAtom);
  httpClient = axios.create({ headers: { Authorization: `Bearer ${accessToken}` }, baseURL });
}
