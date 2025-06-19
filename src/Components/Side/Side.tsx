import { Flex } from "@radix-ui/themes";
import SideHeader from "../SideHeader/SideHeader";
import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { sideOpenAtom } from "@providers/layout";
import Styles from "./styles.module.css";
import NoThreadScreen from "@components/NoThreadScreen/NoThreadScreen";
import { useQuery } from "@tanstack/react-query";
import { searchThreads } from "@apis/threads";
import ThreadItem from "@components/ThreadItem/ThreadItem";

export default function Side() {
  const sideRef = useRef<HTMLDivElement>(null);
  const sideOpen = useAtomValue(sideOpenAtom);
  const { isLoading, data } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      return searchThreads({ page: 1, page_size: 32 });
    },
  });
  function threadsList() {
    if (isLoading) return;
    if (!data) return;
    return data.data.map((thread) => <ThreadItem key={thread.id} thread={thread} />);
  }
  function noThreadScreen() {
    if (isLoading) return;
    if (!data) return;
    if (data.data.length > 0) return;
    return <NoThreadScreen />;
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
          </Flex>
        </>
      )}
    </Flex>
  );
}
