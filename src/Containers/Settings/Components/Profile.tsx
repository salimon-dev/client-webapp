import { tsToDateString } from "@helpers/time";
import UserIcon from "@icons/UserIcon";
import { profileAtom } from "@providers/auth";
import { userVisiblityStr } from "@specs/users";
import { useAtomValue } from "jotai";
import Styles from "./styles.module.css";
import { amountToString, formatWithCommas } from "@helpers/transformers";
export default function Profile() {
  const profile = useAtomValue(profileAtom);
  if (!profile) return;
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <div className={Styles.userLogo}>
        <UserIcon style={{ width: 64, height: 64 }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
        <div className={Styles.profileDetailColumn}>
          <div className={Styles.profileDetail}>Username: {profile.username}</div>
          <div className={Styles.profileDetail}>Visibility: {userVisiblityStr(profile.visibility)}</div>
          <div className={Styles.profileDetail}>Member since: {tsToDateString(profile.registered_at)}</div>
        </div>
        <div className={Styles.profileDetailColumn}>
          <div className={Styles.profileDetail}>Credit: {formatWithCommas(profile.credit)} tokens</div>
          <div className={Styles.profileDetail}>Score: {amountToString(profile.score)} tokens</div>
        </div>
      </div>
    </div>
  );
}
