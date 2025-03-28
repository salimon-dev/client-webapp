import { useState } from "react";
import TextInput, { TextInputProps } from "./TextInput";
import Styles from "./styles.module.css";
import DetailsIcon from "@icons/DetailsIcon";

export default function PasswordInput(props: TextInputProps) {
  const [show, setShow] = useState(false);
  return (
    <TextInput
      {...props}
      type={show ? "text" : "password"}
      rightSlot={
        <div
          className={Styles.passwordBtn}
          onClick={() => {
            setShow(!show);
          }}
        >
          <DetailsIcon style={{ width: 16, height: 16 }} />
        </div>
      }
    />
  );
}
