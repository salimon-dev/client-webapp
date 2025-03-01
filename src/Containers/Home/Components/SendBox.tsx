import SendIcon from "@icons/SendIcon";
import Styles from "./styles.module.css";
import { Button, Flex, TextField } from "@radix-ui/themes";

export default function SendBox() {
  return (
    <Flex direction="row">
      <TextField.Root style={{ flex: 1, height: 42 }} radius="large" placeholder="your message here...">
        <TextField.Slot side="right" className={Styles.sendBoxItem}>
          <Button variant="soft">
            <SendIcon style={{ width: 16, height: 16 }} />
          </Button>
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
}
