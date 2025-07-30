import { ExtraProps } from "react-markdown";

export type MarkdownComponentProps<Element> = React.ClassAttributes<Element> &
  React.HTMLAttributes<Element> &
  ExtraProps;
