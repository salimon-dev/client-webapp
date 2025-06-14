import { Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import AddIcon from "@icons/AddIcon";
import HeaderItem from "../HeaderItem/HeaderItem";
export default function SideHeader() {
  return (
    <Flex direction="row" className={Styles.container}>
      <Flex direction="row">
        <HeaderItem>
          <AddIcon />
        </HeaderItem>
      </Flex>
    </Flex>
  );
}
