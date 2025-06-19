import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import MenuIcon from "@icons/MenuIcon";
import { IThread } from "@specs/threads";
import { useNavigate } from "react-router-dom";

interface IProps {
  thread: IThread;
}
export default function ThreadItem({ thread }: IProps) {
  const navigate = useNavigate();
  return (
    <Flex direction="row" className={Styles.container} onClick={() => navigate(`/thread/${thread.id}`)}>
      <div className={Styles.icon}>
        <img src="/logo.png" />
      </div>
      <div className={Styles.title}>{thread.name}</div>
      <div className={Styles.actions}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost">
              <MenuIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <div>delete</div>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </Flex>
  );
}
