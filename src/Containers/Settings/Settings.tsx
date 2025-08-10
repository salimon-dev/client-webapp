import SettingHeader from "@components/SettingHeader/SettingHeader";
import { Flex } from "@radix-ui/themes";
import Profile from "./Components/Profile";
import Transactions from "./Transactions/Transactions";

export default function Settings() {
  return (
    <Flex direction="column" style={{ flex: 1 }}>
      <SettingHeader />
      <Flex direction="column">
        <Profile />
        <Transactions />
      </Flex>
    </Flex>
  );
}
