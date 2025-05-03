import { Box, Container, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import Header from "@components/Header/Header";
import Content from "@components/Content/Content";
import { useMessages } from "@network/hooks";
import SendBox from "@components/SendBox/SendBox";

export default function Home() {
  const messages = useMessages();
  if (messages.length > 0) {
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
  } else {
    return (
      <Container>
        <Flex direction="column" style={{ height: "100vh" }}>
          <Box className={Styles.header}>
            <Header />
          </Box>
          <Box className={Styles.startup}>
            <SendBox />
          </Box>
        </Flex>
      </Container>
    );
  }
}
