import { Flex, Text, TextField } from "@radix-ui/themes";
import { ChangeEventHandler, FocusEventHandler, JSX } from "react";
export interface ITextInputProps {
  label?: string;
  value?: string;
  name?: string;
  type?: "text" | "password";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  error?: string;
  leftSlot?: JSX.Element;
  rightSlot?: JSX.Element;
}
export default function TextInput({
  name,
  label,
  value,
  type,
  onChange,
  onBlur,
  placeholder,
  error,
  leftSlot,
  rightSlot,
}: ITextInputProps) {
  return (
    <Flex direction="column" gap="2">
      <Text size="2">{label}</Text>
      <TextField.Root
        name={name}
        type={type}
        variant="surface"
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
      >
        {leftSlot && <TextField.Slot side="left">{leftSlot}</TextField.Slot>}
        {rightSlot && <TextField.Slot side="right">{rightSlot}</TextField.Slot>}
      </TextField.Root>
      {error && (
        <Text size="1" color="red">
          {error}
        </Text>
      )}
    </Flex>
  );
}
