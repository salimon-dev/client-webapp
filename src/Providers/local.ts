import { searchMessages, searchThreads } from "@apis/threads";
import { ILocalMessage, ILocalThread, IMessage, IThread } from "@specs/threads";
import { atom } from "jotai";
import { store } from "./store";

const MESSAGE_PAGE_SIZE = 10;

export const threadsSearchQueryAtom = atom<string>("");
export const activeThreadIdAtom = atom<string>();
export const threadsAtom = atom<ILocalThread[]>([]);
export const messagesAtom = atom<ILocalMessage[]>([]);
export const loadingThreadsAtom = atom<boolean>(false);
export const loadingMessagesAtom = atom<string[]>([]);

export async function loadThreads(silent = false) {
  if (!silent) store.set(loadingThreadsAtom, true);
  const name = store.get(threadsSearchQueryAtom);
  const response = await searchThreads({ page: 1, page_size: 10, name });
  store.set(
    threadsAtom,
    response.data.map((item) => ({ ...item, fetchedUntil: undefined }))
  );
  if (!silent) store.set(loadingThreadsAtom, false);
}

function setLoadingMessages(threadId: string, value: boolean) {
  const loadings = store.get(loadingMessagesAtom).filter((id) => id !== threadId);
  if (value) {
    store.set(loadingMessagesAtom, [...loadings, threadId]);
  } else {
    store.set(loadingMessagesAtom, loadings);
  }
}
export async function loadMessages(threadId: string, before?: number) {
  const messages = store.get(messagesAtom);
  const threadMessages = messages.filter((item) => item.thread_id === threadId);
  if (threadMessages.length > 0) return;
  try {
    setLoadingMessages(threadId, true);
    const response = await searchMessages({ before, page_size: MESSAGE_PAGE_SIZE, thread_id: threadId });
    const result = [...messages, ...response.data];
    store.set(messagesAtom, result);
  } finally {
    setLoadingMessages(threadId, false);
  }
}

export async function appendRemoteMessage(message: IMessage, localMessageId?: string) {
  let records = store.get(messagesAtom);
  if (records.some((item) => item.id === message.id)) return;
  if (localMessageId) {
    records = records.filter((item) => item.id !== localMessageId);
  }
  store.set(messagesAtom, [{ ...message, sendStatus: "done" }, ...records]);
}

export async function appendLocalMessage(localMessage: ILocalMessage) {
  const records = store.get(messagesAtom);
  if (records.some((item) => item.id === localMessage.id)) return;
  store.set(messagesAtom, [localMessage, ...records]);
}

export async function putThread(thread: ILocalThread) {
  const records = store.get(threadsAtom);
  if (records.some((item) => item.id === thread.id)) {
    store.set(
      threadsAtom,
      records.map((item) => {
        if (item.id === thread.id) {
          return { ...item, ...thread };
        } else {
          return item;
        }
      })
    );
  } else {
    store.set(threadsAtom, [...records, thread]);
  }
}

export async function deleteLocalThread(thread: IThread) {
  store.set(threadsAtom, (state) => state.filter((item) => item.id !== thread.id));
}

export async function loadOlderMessagesFromThread(threadId: string) {
  const localThread = store.get(threadsAtom).find((item) => item.id === threadId);
  if (!localThread) {
    console.debug("thread not found");
    return;
  }
  await loadMessages(threadId, localThread.fetchedUntil);
  const oldestMessage = store
    .get(messagesAtom)
    .filter((item) => item.thread_id === threadId)
    .reduce((prev, curr) => {
      if (prev.created_at < curr.created_at) {
        return prev;
      } else {
        return curr;
      }
    });
  if (!oldestMessage) {
    console.log("no older messages");
    return;
  }
  putThread({ ...localThread, fetchedUntil: oldestMessage.created_at });
}
