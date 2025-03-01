import { Box, Flex, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import UserIcon from "@icons/UserIcon";
export default function Message() {
  return (
    <Box className={Styles.messageBox}>
      <Flex direction="column" gap="2">
        <Flex direction="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Flex direction="row" style={{ alignItems: "center" }}>
              <UserIcon style={{ width: 24, height: 24 }} />
              <Text>User</Text>
            </Flex>
          </Box>
          <Box className={Styles.messageDate}>2025/12/01 19:34</Box>
        </Flex>
        <Text>
          Ut incididunt nisi et velit. Dolore labore enim laboris anim nisi sint incididunt consectetur
          reprehenderit. Dolore esse laboris est esse irure duis quis consequat ad velit nulla.
        </Text>
      </Flex>
    </Box>
  );
}
