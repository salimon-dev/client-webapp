import { Flex, Text, TextField } from "@radix-ui/themes";
import { ChangeEventHandler, FocusEventHandler, JSX } from "react";
export interface TextInputProps {
  label?: string;
  value?: string;
  name?: string;
  type?: "text" | "password";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onSubmit?: () => void;
  placeholder?: string;
  error?: string;
  leftSlot?: JSX.Element;
  rightSlot?: JSX.Element;
  style?: React.CSSProperties;
}
export default function TextInput({
  name,
  label,
  value,
  type,
  onChange,
  onBlur,
  placeholder,
  onSubmit,
  error,
  leftSlot,
  rightSlot,
  style,
}: TextInputProps) {
  return (
    <Flex direction="column" gap="2" style={style}>
      <Text size="2">{label}</Text>
      <TextField.Root
        name={name}
        type={type}
        variant="surface"
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        style={{ paddingTop: 2 }}
        onKeyUp={(event) => {
          if (event.code === "Enter" && onSubmit) {
            onSubmit();
          }
        }}
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
