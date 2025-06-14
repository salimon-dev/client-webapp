import { Button } from "@radix-ui/themes";
import Styles from "./styles.module.css";

interface IProps {
  children?: React.ReactNode;
  onClick?: () => void;
}
export default function HeaderItem({ children, onClick }: IProps) {
  return (
    <Button variant="soft" className={Styles.headerItem} onClick={onClick} type="button">
      {children}
    </Button>
  );
}
