import Styles from "./styles.module.css";
import Markdown from "react-markdown";
const mdContent = `
#### what can we do for you?

Salimon is a collective network of intelligent entities. You can interact with these entities and get their help by:

* Connecting your profile to your personal Notion account. This allows you to archive and index your pages in Notion, which the network will use as your personal database.
* Updating your personal information such as your place of living, age, and name. This helps the entities assist you more effectively.
* Connecting to your Microsoft account. The entities can manage your emails, documents, and calendar. You can rely on them to send emails, extract important information, report back to you, set up meetings, and manage participants.

To learn more about Salimon, please [read here](/intro).
`;
export default function StartScreen() {
  return (
    <div className={Styles.container}>
      <div>
        <Markdown>{mdContent}</Markdown>
      </div>
    </div>
  );
}
