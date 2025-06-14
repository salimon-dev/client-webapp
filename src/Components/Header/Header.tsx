import { Box, Button, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import LogoIcon from "@icons/LogoIcon";
import ThemeIcon from "@icons/ThemeIcon";
import { changeTheme } from "@providers/theme";
import ProfileDialog from "@components/ProfileDialog/ProfileDialog";
import UserIcon from "@icons/UserIcon";
import LogoutIcon from "@icons/LogoutIcon";
import { nexus } from "@providers/store";
import MenuIcon from "@icons/MenuIcon";
import AddIcon from "@icons/AddIcon";

export default function Header() {
  return (
    <Flex direction="row" align="center" style={{ height: "100%", justifyContent: "space-between" }}>
      <Flex direction="row">
        <Button variant="soft" className={Styles.headerItem}>
          <MenuIcon />
        </Button>
        <Button variant="soft" className={Styles.headerItem}>
          <AddIcon />
        </Button>
      </Flex>
      <Box className={Styles.logo}>
        <LogoIcon style={{ height: 32, width: 32 }} />
      </Box>
      <Flex direction="row">
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
      </Flex>
    </Flex>
  );
}
