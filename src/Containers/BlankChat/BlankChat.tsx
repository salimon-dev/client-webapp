import { Flex } from "@radix-ui/themes";
import MainHeader from "../../Components/ThreadHeader/ThreadHeader";
import SendBox from "@components/SendBox/SendBox";
import SelectUserForm from "@components/SelectUserForm/SelectUserForm";
import { useEffect, useState } from "react";
import { IUser } from "@specs/users";
import { sendMessage, startThread } from "@apis/threads";
import { useNavigate } from "react-router-dom";
import { activeThreadIdAtom, loadThreads } from "@providers/local";
import ThreadContentLoading from "@components/ThreadContentLoading/ThreadContentLoading";
import { useSetAtom } from "jotai";
import { MESSAGE_TYPE_PLAIN, THREAD_CATEGORY_CHAT } from "@specs/threads";

export default function BlankChat() {
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [submitting, setSubmitting] = useState(false);
  const setActiveThread = useSetAtom(activeThreadIdAtom);
  const navigate = useNavigate();
  async function handleOnSubmit(body: string) {
    if (!selectedUser) return;
    try {
      setSubmitting(true);
      const thread = await startThread({
        target_id: selectedUser.id,
        category: THREAD_CATEGORY_CHAT,
      });
      await sendMessage({ thread_id: thread.id, body, type: MESSAGE_TYPE_PLAIN });
      navigate(`/thread/${thread.id}`);
      loadThreads(true);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  }
  useEffect(() => {
    setActiveThread(undefined);
  }, [setActiveThread]);
  return (
    <Flex direction="column" style={{ flex: 1 }}>
      <MainHeader />
      {submitting && selectedUser && (
        <ThreadContentLoading message={`Please wait, you are connecting to ${selectedUser.username} ...`} />
      )}
      {!submitting && <SelectUserForm onUserSelected={setSelectedUser} selectedUser={selectedUser} />}
      <SendBox onSubmit={handleOnSubmit} disabled={!selectedUser} />
    </Flex>
  );
}
