import { Button, Card, Container, Flex } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import Styles from "./styles.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ThemeIcon from "@icons/ThemeIcon";
import { changeTheme } from "@providers/theme";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>();
  useEffect(() => {
    axios
      .get("/intro.md")
      .then((res) => res.data)
      .then((data) => {
        setContent(data);
      });
  }, []);
  return (
    <Container>
      <Flex direction="column">
        <Card className={Styles.container}>
          <Flex direction="column">
            <Flex direction="row" style={{ justifyContent: "space-between" }}>
              <Button
                size="1"
                variant="outline"
                onClick={() => {
                  navigate("/");
                }}
              >
                Join
              </Button>
              <Button size="1" variant="outline" onClick={changeTheme}>
                <ThemeIcon style={{ width: 16, height: 16 }} />
              </Button>
            </Flex>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Flex>
        </Card>
      </Flex>
    </Container>
  );
}
