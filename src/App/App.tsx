import { Theme } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import Splash from "@components/Splash/Splash";
import AuthRoutes from "./AuthRoutes";
import GuestRoutes from "./GuestRoutes";
import { themeModeAtom } from "@providers/theme";
import { accessTokenAtom, bootstrapStateAtom } from "@providers/auth";

export function Phases() {
  const bootstrapState = useAtomValue(bootstrapStateAtom);
  const accessToken = useAtomValue(accessTokenAtom);
  if (bootstrapState === "init") {
    return <Splash status="connecting to nexus" />;
  }
  if (bootstrapState === "loading") {
    return <Splash status="authenticating" />;
  }

  if (accessToken) {
    return <AuthRoutes />;
  } else {
    return <GuestRoutes />;
  }
}

export default function App() {
  const theme = useAtomValue(themeModeAtom);
  return (
    <Theme appearance={theme} accentColor="indigo">
      <Phases />
    </Theme>
  );
}
