import { Box, Container, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import Header from "./Components/Header";
import SendBox from "./Components/SendBox";
import Content from "./Components/Content";

export default function Home() {
  return (
    <Container>
      <Flex direction="column" style={{ height: "100vh" }}>
        <Box className={Styles.header}>
          <Header />
        </Box>
        <Box className={Styles.content}>
          <Content />
        </Box>
        <Box className={Styles.footer}>
          <SendBox />
        </Box>
      </Flex>
    </Container>
  );
}
