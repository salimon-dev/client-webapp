import { Flex } from "@radix-ui/themes";
import SideHeader from "../SideHeader/SideHeader";
import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { sideOpenAtom } from "@providers/layout";
import Styles from "./styles.module.css";
import NoThreadScreen from "@components/NoThreadScreen/NoThreadScreen";

export default function Side() {
  const sideRef = useRef<HTMLDivElement>(null);
  const sideOpen = useAtomValue(sideOpenAtom);
  useEffect(() => {
    if (!sideRef.current) return;
    if (sideOpen) {
      sideRef.current!.style.maxWidth = "320px";
    } else {
      sideRef.current.style.maxWidth = "0px";
    }
  }, [sideOpen]);
  return (
    <Flex direction="column" className={Styles.container} ref={sideRef}>
      {sideOpen && (
        <>
          <SideHeader />
          <Flex direction="column" style={{ flex: 1, overflow: "auto" }}>
            <NoThreadScreen />
          </Flex>
        </>
      )}
    </Flex>
  );
}
