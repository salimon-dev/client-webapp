import { searchMessages, searchThreads } from "@apis/threads";
import { IMessage, IThread } from "@specs/threads";
import { atom } from "jotai";
import { store } from "./store";

export const threadsSearchQueryAtom = atom<string>("");
export const threadsAtom = atom<IThread[]>([]);
export const messagesAtom = atom<IMessage[]>([]);
export const loadingThreadsAtom = atom<boolean>(false);
export const loadingMessagesAtom = atom<string[]>([]);

export async function loadThreads() {
  store.set(loadingThreadsAtom, true);
  const name = store.get(threadsSearchQueryAtom);
  const response = await searchThreads({ page: 1, page_size: 10, name });
  store.set(threadsAtom, response.data);
  store.set(loadingThreadsAtom, false);
}

function setLoadingMessages(threadId: string, value: boolean) {
  const loadings = store.get(loadingMessagesAtom).filter((id) => id !== threadId);
  if (value) {
    store.set(loadingMessagesAtom, [...loadings, threadId]);
  } else {
    store.set(loadingMessagesAtom, loadings);
  }
}
export async function loadMessages(threadId: string) {
  const messages = store.get(messagesAtom);
  const threadMessages = messages.filter((item) => item.thread_id === threadId);
  if (threadMessages.length > 0) return;
  try {
    setLoadingMessages(threadId, true);
    const response = await searchMessages({ page: 1, page_size: 10, thread_id: threadId });
    const result = [...messages, ...response.data];
    store.set(messagesAtom, result);
  } finally {
    setLoadingMessages(threadId, false);
  }
}

export async function appendMessage(message: IMessage) {
  const records = store.get(messagesAtom);
  store.set(messagesAtom, [...records, message]);
}
