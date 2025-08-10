import { IUser } from "@specs/users";
import Styles from "./styles.module.css";
interface IProps {
  user: IUser;
  onSelect: () => void;
  selected: boolean;
}
export default function UserRecord({ user, onSelect, selected }: IProps) {
  const classes = [Styles.container];
  if (selected) {
    classes.push(Styles.selected);
  }
  return (
    <div className={classes.join(" ")} onClick={onSelect}>
      {user.username}
    </div>
  );
}
