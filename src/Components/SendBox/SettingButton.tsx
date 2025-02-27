import { useNavigate } from "react-router-dom";
import { isLoggedIn, logtoClient } from "@providers/auth";
import SettingsIcon from "@icons/SettingsIcon";

export default function SettingButton() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (isLoggedIn()) {
          navigate("/storage");
        } else {
          logtoClient.signIn(import.meta.env["VITE_AUTH_REDIRECT_URL"]);
        }
      }}
    >
      <SettingsIcon />
    </div>
  );
}
