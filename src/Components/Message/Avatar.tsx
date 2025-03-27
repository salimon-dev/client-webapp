import LogoIcon from "@icons/LogoIcon";
import UserIcon from "@icons/UserIcon";
import { Flex, Text } from "@radix-ui/themes";

interface Props {
  from: string;
}
export default function Avatar({ from }: Props) {
  if (from === "user") {
    return (
      <Flex direction="row" style={{ alignItems: "center", height: 38 }}>
        <UserIcon style={{ width: 24, height: 24 }} />
        <Text style={{ marginTop: 2, marginLeft: 8 }}>user</Text>
      </Flex>
    );
  } else {
    return (
      <Flex direction="row" style={{ alignItems: "center", height: 38 }}>
        <LogoIcon style={{ width: 24, height: 24 }} />
        <Text style={{ marginTop: 2, marginLeft: 8 }}>{from}</Text>
      </Flex>
    );
  }
}
