import SendIcon from "@icons/SendIcon";
import { useRef, useState } from "react";
import ActionButton from "./ActionButton";
import Styles from "./styles.module.css";
import { updateSendBoxHeight } from "@providers/layout";
export default function SendBox() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // const interactionState = useInteractionState();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  async function send() {
    if (!body) return;
    try {
      setLoading(true);
      setBody("");
      // TODO: implement send message
      // await nexus.interact({ body, from: "user", type: "plain" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   if (!containerRef.current || !suggestionRef.current) return;
  //   if (showSuggestion) {
  //     console.log("show");
  //   } else {
  //     console.log("hide");
  //   }
  // }, [showSuggestion]);

  return (
    <div className={Styles.container} ref={containerRef}>
      {/* <div className={Styles.suggestion} ref={suggestionRef}>
        some
      </div> */}
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
          console.log(h, inputRef.current.scrollHeight);
          inputRef.current.style.height = h + "px";
          // containerRef.current.style.maxHeight = h + 16 + "px";
          updateSendBoxHeight(h + 16);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) send();
          // if (event.key === "@") {
          //   setShowSuggestion(true);
          // }
          // if (event.key === "/") {
          //   setShowSuggestion(true);
          // }
        }}
        onPaste={(event) => {
          console.log(event);
        }}
        name="body"
        placeholder="Type here ..."
      />
      <div className={Styles.actions}>
        {/* <div className={Styles.interactionStatus}>
          {interactionState ? `${interactionState.name} is typing ...` : ""}
        </div> */}
        <ActionButton onClick={send}>
          {loading ? <span>...</span> : <SendIcon style={{ width: "18px", height: "18px" }} />}
        </ActionButton>
      </div>
    </div>
  );
}
