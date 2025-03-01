import { Box, Button, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import LogoIcon from "@icons/LogoIcon";
import UserIcon from "@icons/UserIcon";
import ThemeIcon from "@icons/ThemeIcon";
import { store, themeModeAtom } from "@providers/store";

export default function Header() {
  return (
    <Flex direction="row" align="center" style={{ height: "100%" }}>
      <Box className={Styles.logo}>
        <LogoIcon style={{ height: 32, width: 32 }} />
      </Box>
      {/* <Box className={Styles.headerItem}>new</Box> */}
      <Button variant="soft" className={Styles.headerItem}>
        <UserIcon />
      </Button>
      <Button
        variant="soft"
        className={Styles.headerItem}
        onClick={() => {
          const theme = store.get(themeModeAtom);
          switch (theme) {
            case "dark":
              store.set(themeModeAtom, "light");
              break;
            case "light":
            default:
              store.set(themeModeAtom, "dark");
          }
        }}
      >
        <ThemeIcon />
      </Button>
      {/* <Box className={Styles.headerItem}>history</Box>
      <Box className={Styles.headerItem}>entity</Box>
      <Box className={Styles.headerItem}>logout</Box> */}
    </Flex>
  );
}
