import { searchMessages, searchThreads } from "@apis/threads";
import { ILocalMessage, ILocalThread, IMessage, IThread } from "@specs/threads";
import { atom } from "jotai";
import { store } from "./store";

const MESSAGE_PAGE_SIZE = 10;

export const threadsSearchQueryAtom = atom<string>("");

export const activeThreadIdAtom = atom<string>();
export const threadsAtom = atom<ILocalThread[]>([]);
export const loadingThreadsAtom = atom<boolean>(false);

export const messagesAtom = atom<ILocalMessage[]>([]);
export const activeJobsAtom = atom<string[]>([]);

function hasActiveJob(jobId: string) {
  return store.get(activeJobsAtom).includes(jobId);
}
function pushActiveJob(jobId: string) {
  store.set(activeJobsAtom, (state) => [...state, jobId]);
}
function removeActiveJob(jobId: string) {
  store.set(activeJobsAtom, (state) => state.filter((job) => job !== jobId));
}

export function getActiveThread() {
  const id = store.get(activeThreadIdAtom);
  if (!id) {
    return undefined;
  }
  return store.get(threadsAtom).find((item) => item.id === id);
}

export async function loadThreads(silent = false) {
  if (!silent) store.set(loadingThreadsAtom, true);
  const name = store.get(threadsSearchQueryAtom);
  const response = await searchThreads({ page: 1, page_size: 10, name });
  // TODO: make has older messages flag functional
  store.set(
    threadsAtom,
    response.data.map((item) => ({ ...item, fetchedUntil: undefined, hasOlderMessages: true }))
  );
  if (!silent) store.set(loadingThreadsAtom, false);
}

export async function loadMessages(threadId: string, mode: "init" | "load_more" = "init") {
  // check if there is any active job regarding this thread loading messages
  if (hasActiveJob(`message:init:${threadId}`)) return;
  if (hasActiveJob(`message:load_more:${threadId}`)) return;

  const thread = store.get(threadsAtom).find((item) => item.id === threadId);
  if (!thread) {
    console.debug("thread not found");
    return;
  }
  // if it's init mode, then client must not have any messages in the list yet.
  if (mode === "init") {
    if (store.get(messagesAtom).some((item) => item.thread_id === threadId)) {
      return;
    }
  }

  const jobKey = `message:${mode}:${threadId}`;
  pushActiveJob(jobKey);
  try {
    const messages = store.get(messagesAtom);
    const response = await searchMessages({
      before: mode === "init" ? undefined : thread.fetchedUntil,
      page_size: MESSAGE_PAGE_SIZE,
      thread_id: threadId,
    });
    const newMessages = response.data.filter((item) => !messages.find((m) => m.id == item.id));
    const result = [...messages, ...newMessages];
    store.set(messagesAtom, result);
    updateThreadOldestMessageIndex(threadId);
  } catch (e) {
    console.log(e);
  } finally {
    removeActiveJob(jobKey);
  }
}

export async function updateThreadOldestMessageIndex(threadId: string) {
  const thread = store.get(threadsAtom).find((item) => item.id === threadId);
  const messages = store.get(messagesAtom).filter((item) => item.thread_id === threadId);
  if (!thread) {
    console.debug("thread not found");
    return;
  }

  const oldestMessage = messages.reduce((prev, curr) => (prev.created_at < curr.created_at ? prev : curr));
  if (!oldestMessage) {
    putThread({ ...thread, fetchedUntil: undefined });
  } else {
    putThread({ ...thread, fetchedUntil: oldestMessage.created_at });
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
  await loadMessages(threadId, "load_more");
}
