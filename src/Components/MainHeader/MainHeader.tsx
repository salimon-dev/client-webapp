import { Box, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import MenuIcon from "@icons/MenuIcon";
import AddIcon from "@icons/AddIcon";
import LogoIcon from "@icons/LogoIcon";
import ThemeIcon from "@icons/ThemeIcon";
import LogoutIcon from "@icons/LogoutIcon";
import { changeTheme } from "@providers/theme";
import HeaderItem from "../HeaderItem/HeaderItem";
import { sideOpenAtom, toggleSide } from "@providers/layout";
import { useAtomValue } from "jotai";
import { clearAuth } from "@providers/auth";
export default function MainHeader() {
  const sideOpen = useAtomValue(sideOpenAtom);
  return (
    <Flex direction="row" className={Styles.mainHeader}>
      <Flex direction="row">
        <HeaderItem onClick={toggleSide}>
          <MenuIcon />
        </HeaderItem>
        {!sideOpen && (
          <HeaderItem>
            <AddIcon />
          </HeaderItem>
        )}
      </Flex>
      <Box className={Styles.logo}>
        <LogoIcon style={{ height: 32, width: 32 }} />
      </Box>
      <Flex direction="row">
        {/* TODO: Profile Dialog */}
        {/* <ProfileDialog>
          <HeaderItem>
            <UserIcon />
          </HeaderItem>
        </ProfileDialog> */}
        <HeaderItem onClick={changeTheme}>
          <ThemeIcon />
        </HeaderItem>
        <HeaderItem onClick={clearAuth}>
          <LogoutIcon />
        </HeaderItem>
      </Flex>
    </Flex>
  );
}
