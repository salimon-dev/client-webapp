import { Flex, Text } from "@radix-ui/themes";

export default function LoadingView() {
  return (
    <Flex style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>loading threads</Text>
    </Flex>
  );
}
