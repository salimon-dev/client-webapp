import { Flex, Text } from "@radix-ui/themes";

export default function NoThreadScreen() {
  return (
    <Flex style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>There are no threads yet</Text>
    </Flex>
  );
}
