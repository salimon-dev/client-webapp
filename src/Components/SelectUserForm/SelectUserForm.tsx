import Styles from "./styles.module.css";
import { useAtomValue } from "jotai";
import { sendBoxHeightAtom } from "@providers/layout";
import TextInput from "@components/Inputs/TextInput";
import UserRecord from "./UserRecord/UserRecord";
import { IUser } from "@specs/users";
import { useEffect, useRef, useState } from "react";
import { searchUsers } from "@apis/users";
import MessageView from "./MessageView/MessageView";

interface IProps {
  onUserSelected: (user: IUser) => void;
  selectedUser?: IUser;
}
export default function SelectUserForm({ onUserSelected, selectedUser }: IProps) {
  const sendBoxHeight = useAtomValue(sendBoxHeightAtom);
  const [query, setQuery] = useState("");
  const queryDebounceRef = useRef<NodeJS.Timeout>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    if (queryDebounceRef.current !== null) {
      clearTimeout(queryDebounceRef.current);
      queryDebounceRef.current = null;
    }
    queryDebounceRef.current = setTimeout(async () => {
      try {
        const res = await searchUsers({ page: 1, page_size: 4, username: query });
        setUsers(res.data);
      } finally {
        setIsFetching(false);
      }
    }, 750);
  }, [query]);

  function userList() {
    if (isFetching) return;
    if (users.length === 0) return <MessageView message="no users found" />;
    return users.map((item) => (
      <UserRecord
        user={item}
        key={item.id}
        onSelect={() => onUserSelected(item)}
        selected={selectedUser ? selectedUser.id === item.id : false}
      />
    ));
  }

  return (
    <div className={Styles.container} style={{ maxHeight: `calc(100vh - ${sendBoxHeight}px)` }}>
      <div className={Styles.content}>
        <div>
          you can start a conversation with someone here, this person can be another user in network or an
          entity
        </div>
        <div>
          <TextInput
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            label="search for a user"
            placeholder="username..."
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            maxHeight: "30vh",
            overflowY: "auto",
          }}
        >
          {userList()}
          {isFetching && <MessageView message="searching users..." />}
        </div>
      </div>
    </div>
  );
}
