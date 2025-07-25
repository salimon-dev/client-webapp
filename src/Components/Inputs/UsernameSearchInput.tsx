import { useRef, useState } from "react";
import TextInput from "./TextInput";
import Styles from "./styles.module.css";
import SearchIcon from "@icons/SearchIcon";
import { IUser } from "@specs/users";
import { searchUserByUsername } from "@apis/users";

interface IProps {
  label?: string;
  value?: IUser;
  name?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  onChange: (user?: IUser) => void;
  debounce?: number;
}
export default function UsernameSearchInput(props: IProps) {
  const [query, setQuery] = useState("");
  const debounceRef = useRef<NodeJS.Timeout>(null);
  async function search(query: string) {
    try {
      const response = await searchUserByUsername(query);
      if (!response) {
        props.onChange(undefined);
      } else {
        props.onChange(response);
      }
    } catch (error) {
      console.log(error);
      props.onChange(undefined);
    }
  }
  return (
    <TextInput
      label={props.label}
      name={props.name}
      placeholder={props.placeholder}
      onChange={(event) => {
        const value = event.target.value;
        setQuery(value);

        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = null;
        }
        debounceRef.current = setTimeout(() => {
          search(value);
        }, props.debounce || 750);
      }}
      onSubmit={() => {
        search(query);
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = null;
        }
      }}
      rightSlot={
        <div
          className={Styles.rightBtn}
          onClick={() => {
            search(query);
            if (debounceRef.current) {
              clearTimeout(debounceRef.current);
              debounceRef.current = null;
            }
          }}
        >
          <SearchIcon style={{ width: 16, height: 16 }} />
        </div>
      }
    />
  );
}
