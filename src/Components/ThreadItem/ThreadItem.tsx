import { Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import MenuIcon from "@icons/MenuIcon";
import { IThread } from "@specs/threads";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@icons/DeleteIcon";

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
      <div
        className={Styles.actions}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost">
              <MenuIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content style={{ width: 160 }}>
            <Button
              style={{ display: "flex", justifyContent: "start", alignItems: "center" }}
              variant="ghost"
            >
              <DeleteIcon style={{ width: 16, height: 16 }} />
              <Text style={{ marginTop: 5, marginLeft: 4 }}>Delete</Text>
            </Button>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </Flex>
  );
}
