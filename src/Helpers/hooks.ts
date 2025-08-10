import {
  activeJobsAtom,
  activeThreadIdAtom,
  loadingThreadsAtom,
  messagesAtom,
  threadsAtom,
  threadsSearchQueryAtom,
} from "@providers/local";
import { useAtomValue } from "jotai";

export function useThreadMessages(threadId: string) {
  const messages = useAtomValue(messagesAtom);
  return messages.filter((item) => item.thread_id === threadId);
}

export function useThreads() {
  const threads = useAtomValue(threadsAtom);
  return threads;
}

export function useThreadQuery() {
  const query = useAtomValue(threadsSearchQueryAtom);
  return query;
}

export function useLoadingThreads() {
  const loading = useAtomValue(loadingThreadsAtom);
  return loading;
}

export function useLoadingLastMessages(threadId: string) {
  const activeJobs = useAtomValue(activeJobsAtom);
  return activeJobs.includes(`message:init:${threadId}`);
}

export function useLoadingMoreMessages(threadId: string) {
  const activeJobs = useAtomValue(activeJobsAtom);
  return activeJobs.includes(`message:load_more:${threadId}`);
}

export function useActiveThread() {
  const activeThreadId = useAtomValue(activeThreadIdAtom);
  const threads = useAtomValue(threadsAtom);
  return threads.find((item) => item.id === activeThreadId);
}
