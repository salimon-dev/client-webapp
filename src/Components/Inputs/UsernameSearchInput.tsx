import { FocusEventHandler, useRef, useState } from "react";
import TextInput from "./TextInput";
import Styles from "./styles.module.css";
import SearchIcon from "@icons/SearchIcon";
import { IUser } from "@specs/users";
import { searchUserByUsername } from "@apis/users";
import LoadingIcon from "@icons/LoadingIcon";
import ErrorIcon from "@icons/ErrorIcon";
import SuccessIcon from "@icons/SuccessIcon";

interface IProps {
  label?: string;
  value?: IUser;
  name?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  onChange: (user?: IUser) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  debounce?: number;
  error?: string;
}
export default function UsernameSearchInput(props: IProps) {
  const [query, setQuery] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>(null);
  async function search(query: string) {
    try {
      setLoading(true);
      const response = await searchUserByUsername(query);
      if (!response) {
        props.onChange(undefined);
      } else {
        props.onChange(response);
      }
    } catch (error) {
      console.log(error);
      props.onChange(undefined);
    } finally {
      setLoading(false);
    }
  }

  function rightSlot() {
    if (loading) return <LoadingIcon style={{ width: 16, height: 16 }} />;
    if (touched && !props.value) {
      return <ErrorIcon style={{ width: 16, height: 16 }} />;
    }
    if (props.value) {
      return <SuccessIcon style={{ width: 16, height: 16 }} />;
    }
    return <SearchIcon style={{ width: 16, height: 16 }} />;
  }
  return (
    <TextInput
      label={props.label}
      name={props.name}
      placeholder={props.placeholder}
      onChange={(event) => {
        const value = event.target.value;
        setQuery(value);
        setTouched(true);
        setLoading(true);
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
        setTouched(true);
        setLoading(true);
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = null;
        }
      }}
      error={props.error}
      onBlur={props.onBlur}
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
          {rightSlot()}
        </div>
      }
    />
  );
}
