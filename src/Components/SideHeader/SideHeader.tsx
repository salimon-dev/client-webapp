import { Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import SearchInput from "@components/Inputs/SearchInput";
import { store } from "@providers/store";
import { threadSearchQueryAtom } from "@providers/local";
export default function SideHeader() {
  return (
    <Flex direction="row" className={Styles.container}>
      <SearchInput
        placeholder="search..."
        onSearch={(query) => {
          store.set(threadSearchQueryAtom, query);
        }}
        style={{ width: "100%" }}
      />
    </Flex>
  );
}
