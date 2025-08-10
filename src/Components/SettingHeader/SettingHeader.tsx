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
export default function SettingHeader() {
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
        <HeaderItem onClick={clearAuth}>
          <LogoutIcon />
        </HeaderItem>
      </Flex>
    </Flex>
  );
}
