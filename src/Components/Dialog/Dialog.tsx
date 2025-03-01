import { Dialog as RDialog } from "@radix-ui/themes";
import { JSX } from "react";

interface IProps {
  title: string;
  description: string;
  trigger: JSX.Element;
  children: JSX.Element;
}
export default function Dialog({ title, description, trigger, children }: IProps) {
  return (
    <RDialog.Root>
      <RDialog.Trigger>{trigger}</RDialog.Trigger>
      <RDialog.Content maxWidth="450px">
        <RDialog.Title>{title}</RDialog.Title>
        <RDialog.Description>{description}</RDialog.Description>
        {children}
      </RDialog.Content>
    </RDialog.Root>
  );
}
