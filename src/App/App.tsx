import { useIsLoggedIn } from "@providers/auth";
import AuthRoutes from "./AuthRoutes";
import GuestRoutes from "./GuestRoutes";
import { JSX, useEffect, useState } from "react";
import { Theme } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { setupStorage, themeModeAtom } from "@providers/store";
import Splash from "@components/Splash/Splash";

export default function App() {
  const [phase, setPhase] = useState<"init" | "guest" | "member">("init");
  const isLoggedIn = useIsLoggedIn();

  // useEffect(() => {
  //   setupStorage().then((result) => {
  //     if (result) {
  //       setPhase("member");
  //     } else {
  //       setPhase("guest");
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setPhase("member");
  //   }
  // }, [isLoggedIn]);

  if (phase === "init")
    return (
      <ThemeStage>
        <Splash status="loading..." />
      </ThemeStage>
    );
  if (isLoggedIn) {
    return (
      <ThemeStage>
        <AuthRoutes />
      </ThemeStage>
    );
  } else {
    return (
      <ThemeStage>
        <GuestRoutes />
      </ThemeStage>
    );
  }
}

export function ThemeStage({ children }: { children: JSX.Element }) {
  const theme = useAtomValue(themeModeAtom);
  return (
    <Theme appearance={theme} accentColor="gray">
      {children}
    </Theme>
  );
}
