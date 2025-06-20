import { useRef, useState } from "react";
import TextInput from "./TextInput";
import Styles from "./styles.module.css";
import SearchIcon from "@icons/SearchIcon";

interface IProps {
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  onSearch: (query: string) => void;
  debounce?: number;
}
export default function SearchInput(props: IProps) {
  const [query, setQuery] = useState("");
  const debounceRef = useRef<NodeJS.Timeout>(null);
  return (
    <TextInput
      {...props}
      onChange={(event) => {
        const value = event.target.value;
        setQuery(value);

        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = null;
        }
        debounceRef.current = setTimeout(() => {
          props.onSearch(value);
        }, props.debounce || 750);
      }}
      onSubmit={() => {
        props.onSearch(query);
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = null;
        }
      }}
      rightSlot={
        <div
          className={Styles.rightBtn}
          onClick={() => {
            props.onSearch(query);
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
