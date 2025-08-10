import { Flex } from "@radix-ui/themes";
import SideHeader from "../SideHeader/SideHeader";
import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { sideOpenAtom } from "@providers/layout";
import Styles from "./styles.module.css";
import NoThreadScreen from "@components/Side/NoThreadView/NoThreadView";
import ThreadItem from "@components/ThreadItem/ThreadItem";
import LoadingView from "./LoadingView/LoadingView";
import { useLoadingThreads, useThreads } from "@helpers/hooks";

export default function Side() {
  const sideRef = useRef<HTMLDivElement>(null);
  const sideOpen = useAtomValue(sideOpenAtom);

  const threads = useThreads();
  const isLoading = useLoadingThreads();

  function threadsList() {
    if (isLoading) return;
    return threads.map((thread) => <ThreadItem key={thread.id} thread={thread} />);
  }
  function noThreadScreen() {
    if (isLoading) return;
    if (threads.length > 0) return;
    return <NoThreadScreen />;
  }
  function loading() {
    if (isLoading) return <LoadingView />;
  }
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
            {threadsList()}
            {noThreadScreen()}
            {loading()}
          </Flex>
        </>
      )}
    </Flex>
  );
}
