import { tsToHumanDate } from "@utils";
import Styles from "./styles.module.css";
import { useEffect, useState } from "react";
import UserIcon from "@icons/UserIcon";
import LogoIcon from "@icons/LogoIcon";
import { IMessage } from "@specs";
import Markdown from "react-markdown";
import { useMetaValue } from "@providers/meta";
import CircleIcon from "@icons/CircleIcon";
interface IProps {
  message: IMessage;
}

export default function Message({ message }: IProps) {
  if (message.type === "call") {
    return (
      <div className={Styles.callLog}>
        <CircleIcon type="info" /> {message.body}
      </div>
    );
  }
  if (message.type === "callLog") {
    return (
      <div className={Styles.callLog}>
        <CircleIcon type="success" /> {message.body}
      </div>
    );
  }
  return <MessageBox message={message} />;
}

function MessageBox({ message }: IProps) {
  const [date, setDate] = useState(tsToHumanDate(message.createdAt));
  const name = useMetaValue("name", "user");
  useEffect(() => {
    setInterval(() => {
      setDate(tsToHumanDate(message.createdAt));
    }, 60000);
  }, [message]);
  function avatar() {
    switch (message.from) {
      case "user":
        return <UserIcon />;
      case "entity":
        return <LogoIcon />;
    }
  }
  function from() {
    switch (message.from) {
      case "entity":
        return "entity";
      case "user":
        return name;
    }
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.bodyContainer}>
        <div className={Styles.innerContainer}>
          <div className={Styles.header}>
            <div className={Styles.image}>{avatar()}</div>
            <div className={Styles.sender}>
              <div className={Styles.name}>{from()}</div>
              <div className={Styles.date}>{date}</div>
            </div>
          </div>
          <div className={Styles.content}>
            <Markdown>{message.body}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
