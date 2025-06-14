import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import MenuIcon from "@icons/MenuIcon";
export default function ThreadItem() {
  return (
    <Flex direction="row" className={Styles.container}>
      <div className={Styles.icon}>
        <img src="/logo.png" />
      </div>
      <div className={Styles.title}>title title title title title title title title title title</div>
      <div className={Styles.actions}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost">
              <MenuIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <div>some</div>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </Flex>
  );
}
