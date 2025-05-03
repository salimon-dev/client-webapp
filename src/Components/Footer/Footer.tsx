import SendIcon from "@icons/SendIcon";
import Styles from "./styles.module.css";
import { nexus } from "@providers/store";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useInteractionState } from "@network/hooks";

export default function Footer() {
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
    <Flex direction="column">
      <Flex direction="row" className={Styles.interactionStatus}>
        {interactionState ? `${interactionState.name} is typing ...` : ""}
      </Flex>
      <Flex direction="row">
        <TextField.Root
          style={{ flex: 1, height: 42 }}
          radius="large"
          placeholder="your message here..."
          value={body}
          onChange={(event) => setBody(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") send();
          }}
        >
          <TextField.Slot side="right">
            <Button loading={loading} variant="soft" onClick={send}>
              <SendIcon style={{ width: 16, height: 16 }} />
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </Flex>
    </Flex>
  );
}
