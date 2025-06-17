import axios from "axios";
import { store } from "./store";
import { accessTokenAtom } from "./auth";

export let httpClient = axios.create({});

export function setupHttpClient(baseURL: string) {
  const accessToken = store.get(accessTokenAtom);
  httpClient = axios.create({ headers: { Authorization: `Bearer ${accessToken}` }, baseURL });
}
