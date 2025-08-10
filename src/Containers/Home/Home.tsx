import { Flex } from "@radix-ui/themes";
import Side from "../../Components/Side/Side";
import { Route, Routes } from "react-router-dom";
import BlankChat from "../BlankChat/BlankChat";
import Thread from "../Thread/Thread";
import Settings from "../Settings/Settings";

export default function Home() {
  return (
    <Flex direction="row" style={{ height: "100vh" }}>
      <Side />
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/thread/:id" element={<Thread />} />
        <Route path="/" element={<BlankChat />} />
      </Routes>
    </Flex>
  );
}
