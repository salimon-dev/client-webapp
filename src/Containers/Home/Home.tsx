import { Flex } from "@radix-ui/themes";
import MainHeader from "../../Components/MainHeader/MainHeader";
import Side from "../../Components/Side/Side";

export default function Home() {
  return (
    <Flex direction="row" style={{ height: "100vh" }}>
      <Side />
      <Flex direction="column" style={{ flex: 1 }}>
        <MainHeader />
        <Flex style={{ flex: 1 }} direction="column">
          content
        </Flex>
        <Flex style={{ flex: 1, maxHeight: 120 }} direction="row">
          send box
        </Flex>
      </Flex>
    </Flex>
  );
  // const messages = useMessages();
  // if (messages.length > 0) {
  //   return (
  //     <Container>
  //       <Flex direction="column" style={{ height: "100vh" }}>
  //         <Box className={Styles.header}>
  //           <Header />
  //         </Box>
  //         <Box className={Styles.content}>
  //           <Content />
  //         </Box>
  //         <Box className={Styles.footer}>
  //           <SendBox />
  //         </Box>
  //       </Flex>
  //     </Container>
  //   );
  // } else {
  //   return (
  //     <Container>
  //       <Flex direction="column" style={{ height: "100vh" }}>
  //         <Box className={Styles.header}>
  //           <Header />
  //         </Box>
  //         <Box className={Styles.startup}>
  //           <SendBox />
  //         </Box>
  //       </Flex>
  //     </Container>
  //   );
  // }
}
