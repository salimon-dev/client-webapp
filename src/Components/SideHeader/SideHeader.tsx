import { Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import SearchInput from "@components/Inputs/SearchInput";
import { useSetAtom } from "jotai";
import { threadsSearchQueryAtom } from "@providers/local";
export default function SideHeader() {
  const setQuery = useSetAtom(threadsSearchQueryAtom);
  return (
    <Flex direction="row" className={Styles.container}>
      <SearchInput placeholder="search..." onSearch={setQuery} style={{ width: "100%" }} />
    </Flex>
  );
}
