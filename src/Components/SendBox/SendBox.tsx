import SendIcon from "@icons/SendIcon";
import { useInteractionState } from "@network/hooks";
import { nexus } from "@providers/store";
import { useRef, useState } from "react";
import ActionButton from "./ActionButton";
import Styles from "./styles.module.css";
export default function SendBox() {
  const ref = useRef<HTMLTextAreaElement>(null);

  const interactionState = useInteractionState();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  async function send() {
    if (!body) return;
    if (body === "clear") {
      await nexus.db.clearMessages();
      setBody("");
      return;
    }
    try {
      setLoading(true);
      setBody("");
      await nexus.interact({ body, from: "user", type: "plain" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.inputBox}>
        <textarea
          ref={ref}
          autoFocus
          value={body}
          className={Styles.input}
          onChange={(event) => {
            setBody(event.target.value);
            // adjust area size
            if (!ref.current) return;
            ref.current.style.height = Math.min(ref.current.scrollHeight, 60) + "px";
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) send();
          }}
          onPaste={(event) => {
            console.log(event);
          }}
          name="body"
          placeholder="Type here ..."
        />
        <div className={Styles.actions}>
          <div className={Styles.interactionStatus}>
            {interactionState ? `${interactionState.name} is typing ...` : ""}
          </div>
          <ActionButton onClick={send}>
            {loading ? <span>...</span> : <SendIcon style={{ width: "18px", height: "18px" }} />}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
