import { Box, Container, Flex } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import Header from "@components/Header/Header";
import Content from "@components/Content/Content";
import Footer from "@components/Footer/Footer";

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
          <Footer />
        </Box>
      </Flex>
    </Container>
  );
}
