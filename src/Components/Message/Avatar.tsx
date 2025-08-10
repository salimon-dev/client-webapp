import UserIcon from "@icons/UserIcon";
import { Flex, Text } from "@radix-ui/themes";

interface Props {
  from?: string;
}
export default function Avatar({ from = "user" }: Props) {
  return (
    <Flex direction="row" style={{ alignItems: "center", height: 38 }}>
      <UserIcon style={{ width: 24, height: 24 }} />
      <Text size="3" style={{ marginTop: 4, marginLeft: 8 }}>
        {from}
      </Text>
    </Flex>
  );
}
