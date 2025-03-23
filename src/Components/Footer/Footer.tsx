import SendIcon from "@icons/SendIcon";
import { nexus } from "@providers/store";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function Footer() {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  async function send() {
    if (!body) return;
    try {
      setLoading(true);
      await nexus.interact({ body });
      setBody("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
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
  );
}
