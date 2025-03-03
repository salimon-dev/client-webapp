import { Box, Button, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import LogoIcon from "@icons/LogoIcon";
import ThemeIcon from "@icons/ThemeIcon";
import { changeTheme } from "@providers/theme";
import ProfileDialog from "@components/ProfileDialog/ProfileDialog";
import UserIcon from "@icons/UserIcon";
import LogoutIcon from "@icons/LogoutIcon";
import { useAtomValue } from "jotai";
import { nexusAtom } from "@providers/store";

export default function Header() {
  const nexus = useAtomValue(nexusAtom);
  return (
    <Flex direction="row" align="center" style={{ height: "100%" }}>
      <Box className={Styles.logo}>
        <LogoIcon style={{ height: 32, width: 32 }} />
      </Box>
      {/* <Box className={Styles.headerItem}>new</Box> */}

      <ProfileDialog>
        <Button variant="soft" className={Styles.headerItem}>
          <UserIcon />
        </Button>
      </ProfileDialog>
      <Button variant="soft" className={Styles.headerItem} onClick={changeTheme}>
        <ThemeIcon />
      </Button>
      <Button variant="soft" className={Styles.headerItem} onClick={nexus.logout}>
        <LogoutIcon />
      </Button>
      {/* <Box className={Styles.headerItem}>history</Box>
      <Box className={Styles.headerItem}>entity</Box>
      <Box className={Styles.headerItem}>logout</Box> */}
    </Flex>
  );
}
