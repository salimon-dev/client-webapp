import SendIcon from "@icons/SendIcon";
import { useRef, useState } from "react";
import ActionButton from "./ActionButton";
import Styles from "./styles.module.css";
import { updateSendBoxHeight } from "@providers/layout";

interface IProps {
  onSubmit: (body: string) => Promise<void>;
  disabled?: boolean;
}
export default function SendBox({ onSubmit, disabled }: IProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  async function send() {
    if (!body) return;
    try {
      setLoading(true);
      setBody("");
      await onSubmit(body);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={Styles.container} ref={containerRef}>
      <textarea
        ref={inputRef}
        autoFocus
        value={body}
        className={Styles.input}
        onChange={(event) => {
          setBody(event.target.value);
          // adjust area size
          if (!inputRef.current) return;
          if (!containerRef.current) return;
          inputRef.current.style.height = "auto";
          const h = Math.min(inputRef.current.scrollHeight - 13, 120);
          inputRef.current.style.height = h + "px";
          updateSendBoxHeight(h + 16);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey || !body.includes("\n"))) {
            send();
            event.preventDefault();
          }
        }}
        onPaste={(event) => {
          console.log(event);
        }}
        name="body"
        placeholder="Type here ..."
      />
      <div className={Styles.actions}>
        <ActionButton onClick={send} disabled={disabled}>
          {loading ? <span>...</span> : <SendIcon style={{ width: "18px", height: "18px" }} />}
        </ActionButton>
      </div>
    </div>
  );
}
