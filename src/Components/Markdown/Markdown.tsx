import ReactMarkdown from "react-markdown";
import { MarkdownComponentProps } from "./specs";
import Styles from "./styles.module.css";
import CopyIcon from "@icons/CopyIcon";
import { useState } from "react";

interface Props {
  content?: string;
}
export default function Markdown({ content }: Props) {
  return (
    <ReactMarkdown
      components={{
        code: Code,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function Code(props: MarkdownComponentProps<HTMLElement>) {
  let language = "text";
  if (props.className) {
    language = props.className.replace("language-", "");
  }

  const [isCopied, setIsCopied] = useState(false);

  const copyBtnClassNames = [Styles.copyButton];
  if (isCopied) {
    copyBtnClassNames.push(Styles.isCopied);
  }

  function onCopy() {
    navigator.clipboard.writeText(props.children as string);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  }
  return (
    <div className={Styles.codeContainer}>
      <div className={Styles.header}>
        <div className={Styles.language}>{language}</div>
        <div className={copyBtnClassNames.join(" ")} onClick={onCopy}>
          <CopyIcon />
        </div>
      </div>
      <code>{props.children}</code>
    </div>
  );
}
