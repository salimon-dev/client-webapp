import { Button, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import MenuIcon from "@icons/MenuIcon";
import { IThread, THREAD_CATEGORY_CHAT, THREAD_CATEGORY_PAYMENTS } from "@specs/threads";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@icons/DeleteIcon";
import UserIcon from "@icons/UserIcon";
import { deleteThread } from "@apis/threads";
import { activeThreadIdAtom, deleteLocalThread, loadThreads } from "@providers/local";
import { useAtomValue } from "jotai";
import { getThreadName } from "@helpers/transformers";
import ChatIcon from "@icons/ChatIcon";
import PaymentIcon from "@icons/PaymentIcon";

interface Props {
  thread: IThread;
}
export default function ThreadItem({ thread }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeThreadId = useAtomValue(activeThreadIdAtom);

  function containerClasses() {
    const classes = [Styles.container];
    if (thread.id === activeThreadId) {
      classes.push(Styles.active);
    }
    return classes.join(" ");
  }
  return (
    <Flex direction="row" className={containerClasses()} onClick={() => navigate(`/thread/${thread.id}`)}>
      <div className={Styles.icon}>
        <ThreadIcon thread={thread} />
      </div>
      <div className={Styles.title}>{getThreadName(thread)}</div>
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
              onClick={async () => {
                await deleteLocalThread(thread);
                if (location.pathname == `/thread/${thread.id}`) {
                  navigate("/");
                }
                await deleteThread(thread.id);
                await loadThreads(true);
              }}
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

function ThreadIcon({ thread }: Props) {
  switch (thread.category) {
    case THREAD_CATEGORY_CHAT:
      return <ChatIcon />;
    case THREAD_CATEGORY_PAYMENTS:
      return <PaymentIcon />;
    default:
      return <UserIcon />;
  }
}
