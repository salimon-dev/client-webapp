import SendIcon from "@icons/SendIcon";
import { Button, Flex, TextField } from "@radix-ui/themes";

export default function Footer() {
  return (
    <Flex direction="row">
      <TextField.Root style={{ flex: 1, height: 42 }} radius="large" placeholder="your message here...">
        <TextField.Slot side="right">
          <Button variant="soft">
            <SendIcon style={{ width: 16, height: 16 }} />
          </Button>
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
}
