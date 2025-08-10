import { Box, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import MenuIcon from "@icons/MenuIcon";
import AddIcon from "@icons/AddIcon";
import LogoIcon from "@icons/LogoIcon";
import LogoutIcon from "@icons/LogoutIcon";
import HeaderItem from "../HeaderItem/HeaderItem";
import { toggleSide } from "@providers/layout";
import { clearAuth } from "@providers/auth";
import { useNavigate } from "react-router-dom";
import SettingIcon from "@icons/SettingIcon";
import { changeTheme } from "@providers/theme";
import ThemeIcon from "@icons/ThemeIcon";
export default function ThreadHeader() {
  const navigate = useNavigate();
  return (
    <Flex direction="row" className={Styles.mainHeader}>
      <Flex direction="row">
        <HeaderItem onClick={toggleSide}>
          <MenuIcon />
        </HeaderItem>
        <HeaderItem
          onClick={() => {
            navigate("/");
          }}
        >
          <AddIcon />
        </HeaderItem>
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
        <HeaderItem
          onClick={() => {
            navigate("/settings");
          }}
        >
          <SettingIcon />
        </HeaderItem>
        <HeaderItem onClick={clearAuth}>
          <LogoutIcon />
        </HeaderItem>
      </Flex>
    </Flex>
  );
}
