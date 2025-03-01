import { Box, Button, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import LogoIcon from "@icons/LogoIcon";
import UserIcon from "@icons/UserIcon";
import ThemeIcon from "@icons/ThemeIcon";
import { toggleThemeWithStorage } from "@providers/storage";
import Dialog from "@components/Dialog/Dialog";

export default function Header() {
  return (
    <Flex direction="row" align="center" style={{ height: "100%" }}>
      <Box className={Styles.logo}>
        <LogoIcon style={{ height: 32, width: 32 }} />
      </Box>
      {/* <Box className={Styles.headerItem}>new</Box> */}

      <Dialog
        title="profile"
        description="you can view and manage your profile here"
        trigger={
          <Button variant="soft" className={Styles.headerItem}>
            <UserIcon />
          </Button>
        }
      >
        <div>some profile</div>
      </Dialog>
      <Button variant="soft" className={Styles.headerItem} onClick={toggleThemeWithStorage}>
        <ThemeIcon />
      </Button>
      {/* <Box className={Styles.headerItem}>history</Box>
      <Box className={Styles.headerItem}>entity</Box>
      <Box className={Styles.headerItem}>logout</Box> */}
    </Flex>
  );
}
