import { useAtomValue } from "jotai";
import Styles from "./styles.module.css";
import { connectedStateAtom, isTypingAtom } from "@providers/store";
export default function StatusLine() {
  const isTyping = useAtomValue(isTypingAtom);
  const connectionState = useAtomValue(connectedStateAtom);
  function caption() {
    if (!connectionState) {
      return "disconnected from network, please check your connection";
    }

    if (isTyping) {
      return "entity is answering...";
    } else {
      return "";
    }
  }

  return <div className={Styles.statusLine}>{caption()}</div>;
}
