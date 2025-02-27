import { useState } from "react";
import Styles from "./styles.module.css";
import ThemeIcon from "@icons/ThemeIcon";
import Button from "@components/Button/Button";
import SendIcon from "@icons/SendIcon";
import StatusLine from "./StatusLine";
import { toggleTheme } from "@providers/theme";
import { useAtomValue } from "jotai";
import { creditAtom } from "@providers/store";
import { channel } from "@workers/Channel";

export default function SendBox() {
  const [content, setContent] = useState<string>("");
  async function send() {
    if (!content) return;
    await channel.send({ type: "message", body: content });
    setContent("");
  }
  return (
    <div className={Styles.container}>
      <StatusLine />
      <div className={Styles.toolbar}>
        <Button size="small" icon={<ThemeIcon />} onClick={toggleTheme} />
        <Profile />
      </div>
      <div className={Styles.content}>
        <input
          autoFocus
          placeholder="message"
          onChange={(event) => setContent(event.target.value)}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              send();
            }
          }}
          value={content}
        />
        <div className={Styles.action}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const credit = useAtomValue(creditAtom);
  return (
    <div className={Styles.profile}>
      {credit.credit - credit.usage}/{credit.credit}
    </div>
  );
}
