import { Dialog as RDialog } from "@radix-ui/themes";
import { JSX } from "react";

interface Props {
  title: string;
  description: string;
  trigger: JSX.Element;
  children: JSX.Element;
}
export default function Dialog({ title, description, trigger, children }: Props) {
  return (
    <RDialog.Root>
      <RDialog.Trigger>{trigger}</RDialog.Trigger>
      <RDialog.Content maxWidth="450px">
        <RDialog.Title style={{ marginBottom: 0 }}>{title}</RDialog.Title>
        <RDialog.Description size="1" style={{ marginBottom: 8, color: "var(--gray-10)" }}>
          {description}
        </RDialog.Description>
        {children}
      </RDialog.Content>
    </RDialog.Root>
  );
}
