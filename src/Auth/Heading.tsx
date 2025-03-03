import { Box, Flex, Heading as RHeading } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import LogoIcon from "@icons/LogoIcon";

export default function Heading() {
  return (
    <Box className={Styles.container}>
      <Flex direction="column" justify="center" align="center">
        <LogoIcon style={{ width: 124 }} />
        <RHeading size="5" style={{ color: "var(--accent-12)" }}>
          It's a collective mind for all
        </RHeading>
      </Flex>
    </Box>
  );
}
