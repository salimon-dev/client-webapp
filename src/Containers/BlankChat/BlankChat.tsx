import { Flex } from "@radix-ui/themes";
import MainHeader from "../../Components/MainHeader/MainHeader";
import SendBox from "@components/SendBox/SendBox";
import SelectUserForm from "@components/SelectUserForm/SelectUserForm";
import { useState } from "react";
import { IUser } from "@specs/users";
import { startThread } from "@apis/threads";
import { useNavigate } from "react-router-dom";
import { loadThreads } from "@providers/local";

export default function BlankChat() {
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const navigate = useNavigate();
  async function handleOnSubmit(body: string) {
    if (!selectedUser) return;
    const response = await startThread({ target_id: selectedUser.id, message: body });
    navigate(`/thread/${response.thread.id}`);
    loadThreads();
  }
  return (
    <Flex direction="column" style={{ flex: 1 }}>
      <MainHeader />
      <SelectUserForm onUserSelected={setSelectedUser} selectedUser={selectedUser} />
      <SendBox onSubmit={handleOnSubmit} disabled={!selectedUser} />
    </Flex>
  );
}
