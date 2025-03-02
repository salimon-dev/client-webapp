import { Theme } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { themeModeAtom } from "@providers/store";
import Splash from "@components/Splash/Splash";
import AuthRoutes from "./AuthRoutes";
import GuestRoutes from "./GuestRoutes";
import { useIsConnectedToNexus, useIsLoggedInToNexus } from "@nexus/hooks";

export function Phases() {
  const isConnectedToNexus = useIsConnectedToNexus();
  const isLoggedIn = useIsLoggedInToNexus();

  if (!isConnectedToNexus) {
    return <Splash status="connecting to nexus" />;
  }

  if (isLoggedIn) {
    return <AuthRoutes />;
  } else {
    return <GuestRoutes />;
  }
}

export default function App() {
  const theme = useAtomValue(themeModeAtom);
  return (
    <Theme appearance={theme} accentColor="blue">
      <Phases />
    </Theme>
  );
}
