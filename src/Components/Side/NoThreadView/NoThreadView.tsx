import { Flex, Text } from "@radix-ui/themes";

export default function NoThreadView() {
  return (
    <Flex style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>No threads found</Text>
    </Flex>
  );
}
